export default async function handler(req, res) {
    try {
        // Retornamos para a rota que entrega a tabela HTML crua e pública
        const response = await fetch('https://megamu.net/boss-log', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Bloqueado pelo Mega MU' });
        }

        const html = await response.text();
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(html);
        
    } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}
