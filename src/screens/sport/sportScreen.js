import {useNavigation} from "../../core/hooks/useNavigation";
import {useEffect, useState} from "react";
import { Header} from "../../components";
import {isMobile} from "react-device-detect";
import {Sport} from "../../components";

import load from '../../assets/img/load.gif';
const SportScreen=(props)=>{
        const nav  = useNavigation();
       

    return  <>
        <Header page={"sport"}/>
        <main className='sp_cont'>
            {
                isMobile? <Sport.SportMobileView/>:<Sport.EuropeanView />
            }
        </main>
        {/*<Footer/>*/}
    </>
}

export default SportScreen;
