async function checkVPN() {

  try {

    const res = await fetch("https://vpnapi.io/api/82b8ecb5b1e847d58531c29c7d495079");
    const data = await res.json();

    console.log(data);

    const security = data.security;

    const isVPN =
      security.vpn ||
      security.proxy ||
      security.tor ||
      security.relay;

    if (isVPN) {

      document.body.innerHTML = `
        <div class="vpn-overlay">
          <div class="vpn-box">
            <h1>VPN Detectada</h1>
            <p>Desactiva tu VPN o Proxy para entrar.</p>
          </div>
        </div>
      `;

    }

  } catch(err) {
    console.error("Error VPN:", err);
  }

}

checkVPN();