
import Loader from '../loader/Loader';
import { ITemplateProps } from '../../models/authentication/Template';

export const Template: React.FC<ITemplateProps> = (props:ITemplateProps) => {
   const { children, title, descripcion  } = props;
  return (
    <>
      <Loader />
      <main className="container bg-white mt-5 p-0 main" >
      <div className="row g-0 w-100 h-100">
        <div className="col-sm-6 align-self-center"> 
          <div className="sign-in-from bg-white">
            <h1 className="mb-0">{title}</h1>
              <p>{descripcion}</p>
            
              <div id="pills-tabContent-1" className="tab-content mt-0">
                  {children}
              </div>
          </div>
        </div>

        <div className="col-sm-6  justify-content-center align-items-center  d-sm-flex d-none bg-gradiant">
            <div  style={{ width: '6rem' }}>
              <img className='w-100 h-100' src='/src/assets/images/logo.png' alt='Imagen login' />
            </div>
        </div>
      </div>
    </main>
    </>
  );
}
