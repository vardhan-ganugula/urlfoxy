export const urlForward = (req, res) => {
    const { url } = req.params; 

    return res.json({
        message: 'URL Forwarding',
        url: decodeURIComponent(url),
        domain: req.hostname,
        host: req.host
    })
}