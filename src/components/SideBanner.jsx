import React from 'react';
import Banner from '../assets/forum.png';

function LoginBanner() {
  return (
    <>
      <h3>Ingforum</h3>
      <p>Forum asik buat lu yang lagi nyari ingfo, atau ngobrol santai.
        Ngobrol. Nanya. Bagi Ingfo? Masuk sini lur
      </p>
      <img src={Banner} alt="forum" />
    </>
  );
}

export default LoginBanner;
