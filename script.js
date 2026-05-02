   // Lógica do Slideshow
   document.addEventListener('DOMContentLoaded', () => {

    const imagensSlideshow = document.querySelectorAll('.slideshow-container img');
    const botaoAnterior = document.getElementById('prev-btn');
    const botaoProximo = document.getElementById('next-btn');
    const tituloSlide = document.getElementById('slide-titulo');
    const subtituloSlide = document.getElementById ('slide-subtitulo');
    
    let slideAtual = 0;
    let intervaloSlide;


    function mostrarSlide(indice) {
    // A lógica para esconder/mostrar as imagens continua a mesma
    imagensSlideshow.forEach((slide) => {
        slide.classList.remove('slide-active');
    });
    imagensSlideshow[indice].classList.add('slide-active');

    // --- NOVA LÓGICA DE FADE PARA O TEXTO ---

    // 1. FADE OUT: Primeiro, tornamos os textos transparentes
    tituloSlide.style.opacity = 0;
    subtituloSlide.style.opacity = 0;

    // 2. PAUSA E ATUALIZAÇÃO: Criamos uma pequena pausa para a animação de fade-out acontecer
    setTimeout(() => {
        // Pega os dados da imagem que está entrando
        const imagemAtiva = imagensSlideshow[indice];
        const novoTitulo = imagemAtiva.getAttribute('data-titulo');
        const novoSubtitulo = imagemAtiva.getAttribute('data-subtitulo');

        // Atualiza o conteúdo dos textos (enquanto eles estão invisíveis)
        if (tituloSlide && novoTitulo) {
            tituloSlide.textContent = novoTitulo;
        }
        if (subtituloSlide && novoSubtitulo) {
            subtituloSlide.textContent = novoSubtitulo;
        }

        // 3. FADE IN: Agora, devolvemos a opacidade, fazendo o novo texto aparecer suavemente
        tituloSlide.style.opacity = 1;
        subtituloSlide.style.opacity = 1;

    }, 700); // Este tempo (400ms) DEVE ser igual ao tempo da transição no CSS (0.4s)

}

    // Função para avançar para o próximo slide
    function proximoSlide() {
        
        slideAtual = (slideAtual + 1) % imagensSlideshow.length; 
        mostrarSlide(slideAtual);
    }
    
    // Função para voltar para o slide anterior
    function slideAnterior() {
        slideAtual = (slideAtual - 1 + imagensSlideshow.length) % imagensSlideshow.length;
        mostrarSlide(slideAtual);
    }
    
    // Função para iniciar o slideshow automático
    function iniciarSlideshow() {
        // Muda de imagem a cada 4 segundos (4000ms)
        intervaloSlide = setInterval(proximoSlide, 4000); 
    }

    // cliques nos botões manuais
    botaoProximo.addEventListener('click', () => {
        clearInterval(intervaloSlide); 
        proximoSlide();
        iniciarSlideshow(); 
    });

    botaoAnterior.addEventListener('click', () => {
        clearInterval(intervaloSlide); 
        slideAnterior();
        iniciarSlideshow(); 
    });

    // Inicia o slideshow quando a página carrega
    iniciarSlideshow();


   
    //            FILTRO DE CONTEÚDO
    
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    const itensGaleria = document.querySelectorAll('.item-galeria');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            botoesFiltro.forEach(outroBotao => outroBotao.classList.remove('active'));
            // Adiciona a classe 'active' apenas ao botão que foi clicado
            botao.classList.add('active');

            const valorFiltro = botao.getAttribute('data-filtro');

            
            itensGaleria.forEach(item => {
                const tipoItem = item.getAttribute('data-tipo');
                const generoItem = item.getAttribute('data-genero');

                // Lógica para decidir se o item deve ser mostrado ou escondido
                let deveMostrar = false;

                if (valorFiltro === 'todos') {
                    deveMostrar = true;
                } else if (valorFiltro === 'filme' && tipoItem === 'filme') {
                    deveMostrar = true;
                } else if (valorFiltro === 'serie' && tipoItem === 'serie') {
                    deveMostrar = true;
                } else if (valorFiltro === 'dorama' && generoItem === 'dorama') {
                    deveMostrar = true;
                } else if (valorFiltro === 'animacao' && generoItem === 'animacao') {
                    deveMostrar = true;
                }

                
                if (deveMostrar) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

});