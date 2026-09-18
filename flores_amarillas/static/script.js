/* =========================================================
   ESPERA A QUE CARGUE EL DOM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader =
        document.getElementById("loader");

    const mainContent =
        document.getElementById("main-content");

    const messageButton =
        document.getElementById("messageButton");

    const modal =
        document.getElementById("messageModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalOverlay =
        document.querySelector(".modal-overlay");

    const petalsContainer =
        document.getElementById("petals-container");


    /* =====================================================
       CARGA DE LA PÁGINA
    ====================================================== */

    setTimeout(() => {

        loader.classList.add("hide");

        mainContent.classList.add("visible");

    }, 2600);


    /* =====================================================
       ABRIR MODAL
    ====================================================== */

    function openModal() {

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CERRAR MODAL
    ====================================================== */

    function closeMessageModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    messageButton.addEventListener(
        "click",
        openModal
    );


    closeModal.addEventListener(
        "click",
        closeMessageModal
    );


    modalOverlay.addEventListener(
        "click",
        closeMessageModal
    );


    /* =====================================================
       ESC PARA CERRAR
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeMessageModal();

            }

        }
    );


    /* =====================================================
       CREAR PÉTALOS
    ====================================================== */

    function createPetal() {

        const petal =
            document.createElement("span");

        petal.classList.add(
            "falling-petal"
        );


        const size =
            Math.random() * 10 + 8;

        const left =
            Math.random() * 100;

        const duration =
            Math.random() * 5 + 5;

        const delay =
            Math.random() * 2;


        petal.style.left =
            `${left}%`;

        petal.style.width =
            `${size}px`;

        petal.style.height =
            `${size * 1.4}px`;

        petal.style.animationDuration =
            `${duration}s`;

        petal.style.animationDelay =
            `${delay}s`;


        petalsContainer.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, (duration + delay) * 1000);

    }


    /* =====================================================
       LLUVIA SUAVE
    ====================================================== */

    function startPetalRain() {

        for (let i = 0; i < 12; i++) {

            setTimeout(
                createPetal,
                i * 250
            );

        }


        setInterval(
            createPetal,
            1300
        );

    }


    setTimeout(
        startPetalRain,
        2800
    );


    /* =====================================================
       EFECTO MOUSE EN EL RAMO
    ====================================================== */

    const bouquet =
        document.querySelector(
            ".bouquet-container"
        );


    if (bouquet) {

        bouquet.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    bouquet.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 80;

                const rotateY =
                    (x - centerX) / 80;


                bouquet.style.transform =
                    `perspective(900px)
                     rotateX(${-rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.01)`;

            }
        );


        bouquet.addEventListener(
            "mouseleave",
            () => {

                bouquet.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       BOTÓN CON EFECTO DE CLIC
    ====================================================== */

    messageButton.addEventListener(
        "click",
        () => {

            createBurst();

        }
    );


    function createBurst() {

        const buttonRect =
            messageButton.getBoundingClientRect();


        for (let i = 0; i < 12; i++) {

            const spark =
                document.createElement("span");

            spark.textContent =
                "✦";

            spark.style.position =
                "fixed";

            spark.style.left =
                `${buttonRect.left +
                buttonRect.width / 2}px`;

            spark.style.top =
                `${buttonRect.top +
                buttonRect.height / 2}px`;

            spark.style.zIndex =
                "6000";

            spark.style.pointerEvents =
                "none";

            spark.style.color =
                "#ffd21c";

            spark.style.fontSize =
                `${Math.random() * 12 + 10}px`;

            document.body.appendChild(
                spark
            );


            const angle =
                Math.random() *
                Math.PI * 2;

            const distance =
                Math.random() * 100 + 50;

            const targetX =
                Math.cos(angle) *
                distance;

            const targetY =
                Math.sin(angle) *
                distance;


            spark.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(0)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${targetX}px),
                                calc(-50% + ${targetY}px)
                            )
                            scale(1.3)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 800,
                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }
            );


            setTimeout(
                () => spark.remove(),
                850
            );

        }

    }


    /* =====================================================
       ANIMACIÓN AL HACER SCROLL
    ====================================================== */

    const sections =
        document.querySelectorAll(
            ".quote-card, .section-title"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }

                    }
                );

            },
            {
                threshold: .15
            }
        );


    sections.forEach(
        (section) => {

            section.style.opacity = "0";

            section.style.transform =
                "translateY(30px)";

            section.style.transition =
                "opacity .8s ease, transform .8s ease";

            observer.observe(section);

        }
    );

});