import { Encoder } from '../modules/encoder';

export const encodeSequence = async (req: any, res: any) => {
    try {
        if (!req.body.sequence) {
            res.status(400).json({
                success: false,
                err: 'Sequence is required for encoding process!'
            });
            return;
        }
        const encoded = Encoder.encode(req.body.sequence);
        if (encoded) {
            res.json({ success: true, encoded });
            return;
        }
        res.status(400).json({ success: false, err: 'Invalid sequence.' });
    } catch (err) {
        res.status(400).json({ success: false, err: err.errmsg || err });
    }
};
