async function checkVPN() {

  try {

    const res = await fetch(
      "https://vpnapi.io/api/YOUR_API_KEY?key=YOUR_API_KEY"
    );

    const data = await res.json();

    const isVPN =
      data.security.vpn ||
      data.security.proxy ||
      data.security.tor ||
      data.security.relay;

    if(isVPN){

      blockAccess();

    }

  } catch(err){

    console.log("VPN CHECK ERROR", err);

  }

}


function blockAccess(){

  document.body.innerHTML = `

    <div id="vpn-block">

      <div class="vpn-box">

        <h1>Acceso bloqueado</h1>

        <p>
          Desactiva tu VPN o Proxy para entrar.
        </p>

      </div>

    </div>

  `;

}

checkVPN();