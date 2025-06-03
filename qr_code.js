const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const QrCode = require('qrcode-reader');
const QRCode = require('qrcode');
const conexao = require('../config_API/db.cjs'); // ajuste o caminho conforme seu projeto

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Rota para gerar e salvar QR Code
router.post('/criar-qrcode', async (req, res) => {
    const { conteudo } = req.body;
    if (!conteudo) {
        return res.status(400).json({ erro: 'Conteúdo é obrigatório.' });
    }
    try {
        // Gera o QR Code em base64
        const qrBase64 = await QRCode.toDataURL(conteudo);

        // Salva no banco (ajuste a query conforme sua tabela)
        conexao.query(
            'INSERT INTO qrcodes (conteudo, imagem_base64) VALUES (?, ?)',
            [conteudo, qrBase64],
            (erro, resultado) => {
                if (erro) {
                    return res.status(500).json({ erro: 'Erro ao salvar no banco.' });
                }
                res.json({ mensagem: 'QR Code criado e salvo!', qrBase64 });
            }
        );
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao gerar QR Code.' });
    }
});



// Rota para ler QR Code de uma imagem
router.post('/ler-qrcode', upload.single('imagem'), async (req, res) => {
    try {
        const imagem = await Jimp.read(req.file.path);
        const qr = new QrCode();
        qr.callback = (err, value) => {
            if (err || !value) {
                return res.status(400).json({ erro: 'QR Code não reconhecido.' });
            }
            // Verifica no banco
            conexao.query(
                'SELECT * FROM qrcodes WHERE conteudo = ?',
                [value.result],
                (erro, resultados) => {
                    if (erro) {
                        return res.status(500).json({ erro: 'Erro ao consultar banco.' });
                    }
                    if (resultados.length === 0) {
                        return res.status(404).json({ mensagem: 'QR Code não encontrado no banco.' });
                    }
                    res.json({ mensagem: 'QR Code encontrado!', dados: resultados[0] });
                }
            );
        };
        qr.decode(imagem.bitmap);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao processar a imagem.' });
    }
});

// ...existing code...
