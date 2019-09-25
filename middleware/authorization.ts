export const authorization = (req: any, res: any, next: any) => {
    if (
        req.headers.authorization !== req.session.token ||
        req.session.expires < Date.now()
    ) {
        return res.sendStatus(401);
    }
    // all ok
    next();
};
