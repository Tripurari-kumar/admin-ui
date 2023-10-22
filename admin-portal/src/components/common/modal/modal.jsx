import ReactDom from 'react-dom';
import './modal.css';
import CloseIcon from '../../../assets/closeIcon.svg';

const Modal = ({ show, close, title, children, onSubmit }) => {
  return ReactDom.createPortal(
    <>
      <div
        className={`modalContainer ${show ? 'show' : ''} `}
        onClick={() => close()}
      >
        <div className='modal' onClick={(e) => e.stopPropagation()}>
          <header className='modal_header'>
            <h2 className='modal_header-title'>{title}</h2>
            <button className='close' onClick={() => close()}>
              <img src={CloseIcon} alt='close' />
            </button>
          </header>
          <main className='modal_content'>{children}</main>
          <footer className='modal_footer'>
            <button className='modal-close' onClick={() => close()}>
              Cacel
            </button>
            <button className='submit' onClick={onSubmit}>
              Submit
            </button>
          </footer>
        </div>
      </div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
