import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren, textVariant, textVariant2 } from '../../utils/motion';
import ReCAPTCHA from 'react-google-recaptcha';
import css from './Resume.module.scss';
import resumePdf from '../../assets/Resume.pdf'

const Resume = () => {
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const handleCaptchaChange = (response) => {
        // Perform captcha verification here using the `response` value
        // Set `captchaVerified` state to true if verified successfully
        console.log(response)
        setCaptchaVerified(true);
    };

    return (
        <motion.section
            variants={staggerChildren}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className={`paddings ${css.wrapper} bg-primary`}
        >
            <div className={`innerWidth flexCenter ${css.container}`}>
                <span className="secondaryText">Download a resume</span>
                <div>for human eyes</div>
                <div>pdf for computer systems</div>
                <div>.docx version</div>
                {captchaVerified ? (
                    <a href={resumePdf} target="_blank" rel="noopener noreferrer">
                        Download Pdf
                    </a>
                ) : (
                    <ReCAPTCHA
                    cookieolicy='single-host-origin'
                        sitekey="TODO: add key"
                        onChange={handleCaptchaChange}
                    />
                )}
            </div>
        </motion.section>
    );
};

export default Resume;
