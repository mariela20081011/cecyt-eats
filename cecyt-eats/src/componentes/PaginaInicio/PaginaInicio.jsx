import React from 'react';
import './PaginaInicio.css';

import {
FaCheckCircle,
FaClock,
FaRunning
} from 'react-icons/fa';



function PaginaInicio({

alNavegararInicioSesion,

alNavegararRegistro,

alVerMenu

}) {



return (


<div className="contenedor-landing">



<header className="barra-navegacion">



<div className="logotipo">


<span className="texto-logo">

CECyT

<span className="resalte-logo">

-Eats

</span>


</span>


</div>





<nav className="botones-navegacion">



<button

className="btn-entrar"

onClick={alNavegararInicioSesion}

>

Entrar

</button>





<button

className="btn-registrarme"

onClick={alNavegararRegistro}

>

Registrarme

</button>





</nav>



</header>







<section className="seccion-hero">



<div className="capa-oscura">



<div className="contenido-hero">



<h1>

¡Tu comida escolar sin filas y a tiempo!

</h1>




<p>

Explora el menú de la cafetería y ordena desde tu celular.

</p>





<button 
className="btn-ver-menu"
onClick={alVerMenu}
>
Ver Menú
</button>





</div>



</div>



</section>








<section className="seccion-informativa">



<h2>

¿Por qué usar CECyT-Eats?

</h2>





<div className="cuadricula-info">





<div className="tarjeta-info">



<FaCheckCircle className="icono-info"/>



<h3>

Fácil

</h3>



<p>

Selecciona tus platillos favoritos en un par de clics.

</p>



</div>








<div className="tarjeta-info">



<FaClock className="icono-info"/>



<h3>

Rápido

</h3>



<p>

Tu orden se prepara de inmediato para evitar retrasos.

</p>



</div>







<div className="tarjeta-info">



<FaRunning className="icono-info"/>



<h3>

Sin Filas

</h3>



<p>

Llega directo a la ventanilla a recoger tu comida.

</p>



</div>






</div>



</section>








<footer className="pie-pagina">



<div className="contenido-pie">



<p>

© 2026 CECyT-Eats. Todos los derechos reservados.

</p>





<div className="enlaces-pie">



<a href="#privacidad">

Aviso de Privacidad

</a>





<a href="#redes">

Redes Sociales

</a>





</div>




</div>




</footer>






</div>


);



}



export default PaginaInicio;