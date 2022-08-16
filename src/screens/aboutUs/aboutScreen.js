import React, {useEffect} from 'react';

import {ContentNavigator, Footer, Header, Swp} from "../../components";
import {useTranslation} from "../../core";


const AboutUsScreen = () =>{
    const {i18n} = useTranslation()
    const {t} = useTranslation();

    return (
        <>
            <Header page={"aboutUs"}/>

            <main className="page">
                <div className="container">
                    {/*<ContentNavigator page="aboutUs" lang={i18n.language}/>*/}
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-headline">{t('About Us')}</div>
                            </div>
                            <div className="col-12 page-body">
                                <p>{t('about_1')}</p>
                                <p>{t('about_2')}</p>
                                <p>{t('about_3')}</p>
                                <p>{t('about_4')}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </main>




            <Footer/>
        </>
    )
}

export default AboutUsScreen
