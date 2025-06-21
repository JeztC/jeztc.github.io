import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import emailjs from '@emailjs/browser';
import {useTranslation} from "react-i18next";
import {AnimatePresence, motion} from "framer-motion";
import Check from "./Check";

const Contact = () => {
    const [sending, setSending] = React.useState<boolean>(false)
    const [sendEmailSuccess, setSendEmailSuccess] = React.useState<boolean>(false)
    const { t } = useTranslation()

    const SendEmail = (object : Record<string, unknown> | undefined) => {
        setSending(true)
        emailjs.send(process.env.REACT_APP_SERVICE_ID === undefined ? "" : process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID === undefined ? "" : process.env.REACT_APP_TEMPLATE_ID, object, process.env.REACT_APP_PUBLIC_KEY === undefined ? "" : process.env.REACT_APP_PUBLIC_KEY).then(
            () => {
                setSendEmailSuccess(true)
                setSending(false)
            },
            () => {
                setSending(false)
            }
        )
    }

    const formik = useFormik({
        initialValues: {
            from_name: '',
            from_email: '',
            message: '',
        },
        validationSchema: yup.object({
            from_name: yup.string().required(t("name_required").toString()),
            from_email: yup.string().email(t("invalid_email").toString()).required(t("email_required").toString()),
            message: yup.string().required(t("message_required").toString()),
        }),
        onSubmit: (values) => {
            SendEmail(values)
            setSendEmailSuccess(true)
        },
        validateOnChange: false,
        validateOnBlur: false,
    })

    return (
        <Container maxWidth="md" style={{marginTop : '100px', marginBottom : '200px'}}>

            <Box overflow="hidden" style={{ paddingTop : '20px', paddingRight : '30px', paddingLeft : '30px', position: 'relative', minHeight: '300px', border: '1px solid #1D9BF0' }}>
                <AnimatePresence>
                    {!sendEmailSuccess && (
                        <form style={{width: '100%'}} onSubmit={formik.handleSubmit}>
                            <TextField
                                style={{ backgroundColor: 'inherit' }}
                                error={Boolean(formik.touched.from_name && formik.errors.from_name)}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.from_name}
                                helperText={formik.touched.from_name && formik.errors.from_name}
                                margin="normal"
                                type="text"
                                fullWidth
                                id="from_name"
                                label={<Typography variant="body1">{t('contact_full_name')}</Typography>}
                                name="from_name"
                            />
                            <TextField
                                error={Boolean(formik.touched.from_email && formik.errors.from_email)}
                                InputProps={{ inputProps: { style: { backgroundColor: 'inherit' }}}}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.from_email}
                                helperText={formik.touched.from_email && formik.errors.from_email}
                                type="from_email"
                                margin="normal"
                                fullWidth
                                id="from_email"
                                label={<Typography variant="body1">{t('contact_email')}</Typography>}
                                name="from_email"
                            />
                            <TextField
                                error={Boolean(formik.touched.message && formik.errors.message)}
                                InputProps={{ inputProps: { style: { backgroundColor: 'inherit' }}}}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.message}
                                helperText={formik.touched.message && formik.errors.message}
                                type="text"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={7}
                                maxRows={8}
                                id="message"
                                label={<Typography variant="body1">{t('contact_message')}</Typography>}
                                name="message"
                                style={{height: '200px', overflow: 'visible'}}
                            />
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button
                                    style={{width: '200px'}}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    id="message_button"
                                    disabled={sending}
                                >
                                    {t('contact_btn')}
                                </Button>
                            </Box>
                        </form>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {sendEmailSuccess && (
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box m={2}>
                                <Check width={150}/>
                            </Box>
                            <Typography
                                component={motion.h4}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay:1.5, duration:1 }}
                                variant="body2"
                            >
                                {t('message_sent')}
                            </Typography>
                        </Box>
                    )}
                </AnimatePresence>
            </Box>
        </Container>
    )
}

export default Contact;