import { useEffect } from 'react';

const loaderInit = () => {
 //   $('#load').fadeOut();.delay(1000).fadeOut('slow');
    let fade: HTMLElement = document.querySelector('#loading') as HTMLElement;
    let value = 1;

    let fadeEffect = setInterval(()=>{
        if(!fade.style.opacity)
        {
            fade.style.opacity = "1";
        }
        else if(Number(fade.style.opacity) > 0)
        {
            value -= 0.5;
            fade.style.opacity = value.toString();
        }
        else {
            fade.style.display = 'none';
            clearInterval(fadeEffect);
        }

    }, 150)
};

export default function Loader() 
{
    

    useEffect(() => {
        loaderInit();
    }, [])
    
  return (
    <div id="loading">
        <div id="loading-center" className="logo">
        </div>
    </div>
  );
}
