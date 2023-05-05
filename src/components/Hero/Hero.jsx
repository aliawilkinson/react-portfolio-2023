import React from 'react'
import css from './hero.module.scss'

const Hero = () => {
    return (
        <section className={`paddings ${css.wrapper}`}>
            <div className={`innerWidth ${css.container}`}>

                <div className={css.upperElements}>
                    <span className='primaryText'>
                        Hey There, <br />
                        I'm Alia.
                    </span>
                    <span className='secondaryText'>
                        I come up with novel solutions <br />
                        for real world problems using software, <br />
                        and I love what I do.
                    </span>
                </div>

                <div className={css.person}>
                    <img src="./rock-portrait.jpg" alt="" />
                </div>

                <div className={css.lowerElements}>
                    <div className={css.experience}>
                        <div className="primaryText">7</div>
                        <div className="secondaryText">
                            <div>
                                Years
                            </div>
                            <div>
                                Experience
                            </div>
                        </div>
                    </div>
                    <div className={css.certificate}>
                        <img src='./aws-sol-arch.png' alt="" /> 
                        <span>CERTIFIED AWS SOLUTIONS ARCHITECT </span>
                        <span>SOFTWARE ENGINEER</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero