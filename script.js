// =========================================================
// VINCERE VALOR
// SCRIPT.JS
// Versão editorial / discreta
// =========================================================


document.addEventListener("DOMContentLoaded", () => {


    // =====================================================
    // 01. ELEMENTOS PRINCIPAIS
    // =====================================================

    const siteHeader =
        document.getElementById("siteHeader");

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const currentYear =
        document.getElementById("currentYear");


    // =====================================================
    // 02. ANO AUTOMÁTICO NO RODAPÉ
    // =====================================================

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    // =====================================================
    // 03. HEADER AO ROLAR A PÁGINA
    // =====================================================

    function updateHeader() {

        if (!siteHeader) {
            return;
        }


        if (window.scrollY > 25) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    // =====================================================
    // 04. MENU MOBILE
    // =====================================================

    if (
        menuToggle &&
        mainNav
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                const menuIsOpen =
                    mainNav.classList.toggle(
                        "active"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(menuIsOpen)
                );


                menuToggle.classList.toggle(
                    "active",
                    menuIsOpen
                );

            }
        );


        // Fecha o menu ao clicar em um link

        const menuLinks =
            mainNav.querySelectorAll("a");


        menuLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        });

    }


    function closeMobileMenu() {

        if (
            !mainNav ||
            !menuToggle
        ) {
            return;
        }


        mainNav.classList.remove(
            "active"
        );


        menuToggle.classList.remove(
            "active"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    // =====================================================
    // 05. FECHAR MENU AO CLICAR FORA
    // =====================================================

    document.addEventListener(
        "click",
        event => {

            if (
                !mainNav ||
                !menuToggle
            ) {
                return;
            }


            const menuIsOpen =
                mainNav.classList.contains(
                    "active"
                );


            if (!menuIsOpen) {
                return;
            }


            const clickedInsideMenu =
                mainNav.contains(
                    event.target
                );


            const clickedMenuButton =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    // =====================================================
    // 06. TECLA ESC FECHA O MENU
    // =====================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    // =====================================================
    // 07. SCROLL SUAVE
    // =====================================================

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    // =====================================================
    // 08. ANIMAÇÕES DE ENTRADA
    // =====================================================
    //
    // Mantemos as animações discretas:
    // sem zoom exagerado, rotação ou parallax.
    //
    // A intenção é o conteúdo simplesmente
    // aparecer de maneira natural ao rolar.
    // =====================================================

    const revealElements =
        document.querySelectorAll(
            [
                ".hero-copy",
                ".hero-visual",
                ".manifesto-content",
                ".section-heading",
                ".service-line",
                ".project",
                ".about-visual",
                ".about-content",
                ".process-step",
                ".contact-content"
            ].join(",")
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "js-reveal"
            );

        }
    );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "js-reveal-visible"
                                    );


                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: 0.10,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        // Fallback para navegadores antigos

        revealElements.forEach(
            element => {

                element.classList.add(
                    "js-reveal-visible"
                );

            }
        );

    }


    // =====================================================
    // 09. MARCAR LINK ATIVO NO MENU
    // =====================================================
    //
    // Enquanto o usuário navega pela página,
    // o link da seção atual recebe a classe "active-link".
    // =====================================================

    const pageSections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            '.main-nav a[href^="#"]'
        );


    if (
        pageSections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const currentId =
                                entry.target.id;


                            navLinks.forEach(
                                navLink => {

                                    navLink.classList
                                        .remove(
                                            "active-link"
                                        );


                                    if (
                                        navLink.getAttribute(
                                            "href"
                                        ) ===
                                        `#${currentId}`
                                    ) {

                                        navLink.classList
                                            .add(
                                                "active-link"
                                            );

                                    }

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );


        pageSections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    // =====================================================
    // 10. REMOVER MENU MOBILE AO AUMENTAR A TELA
    // =====================================================

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {

                closeMobileMenu();

            }

        }
    );


    // =====================================================
    // 11. CONSOLE
    // =====================================================

    console.log(
        "Vincere Valor carregada com sucesso."
    );

});