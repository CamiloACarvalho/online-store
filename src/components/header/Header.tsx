import style from './header.module.css';

function Header() {
  return (
    <header className={ style.header }>
      <img
        className={ style.milo }
        src="../public/milo.png"
        alt="nome da loja"
      />
      <img
        className={ style.logo }
        src="../public/logo.png"
        alt="logo"
        />
    </header>
  );
}

export default Header;
