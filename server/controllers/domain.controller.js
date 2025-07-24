export const handleDomainCheck = (req, res) => {
    const { domain } = req.query;

    if (domain) {
        res.status(200).json({
            message: 'Domain can be processed',
            domain: domain
        });
    } else {
        res.status(403).json({
            message: 'Unspecified domain',
        });
    }
}