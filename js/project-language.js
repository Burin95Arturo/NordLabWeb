// =========================
// PROJECT LANGUAGE
// =========================

const translations = {

    en: {

        "project.title.bedcontrol": "BED CONTROL",

        "project.title.birth": "BIRTH LUMINOUS",

        "project.title.janukiots": "JANUKIOTS",

        "project.title.mickey": "MICKEY SOURVENIRES",

        "project.title.nordic": "NORDIC LAMP",

        "project.category":
            "Custom Design",

        "project.description":
            "From digital model<br>to physical object.",

        "gallery.title":
            "GALLERY",

        "details.title":
            "PROJECT DETAILS",

        "details.material":
            "MATERIAL",

        "details.manufacturing":
            "MANUFACTURING",

        "details.lighting":
            "LIGHTING",

        "details.manufacturing.value":
            "FDM 3D PRINTING",

        "project.details.title": "PROJECT DETAILS",
        
        "ask":
            "ASK FOR YOURS",

        "back":
            "BACK TO PROJECTS",

        "footer.tagline":
            "3D / DESIGN / OBJECTS",

        "nav.home": "HOME",
        "nav.projects": "PROJECTS",
        "nav.about": "ABOUT",
        "nav.contact": "CONTACT"

    },


    es: {

        "project.title":
            "BED CONTROL",

        "project.category":
            "Diseño Personalizado",

        "project.description":
            "Del modelo digital<br>al objeto físico.",

        "gallery.title":
            "GALERÍA",

        "project.details.title":
            "DETALLES DEL PROYECTO",

        "details.title":
            "DETALLES DEL PROYECTO",

        "details.material":
            "MATERIAL",

        "details.manufacturing":
            "FABRICACIÓN",

        "details.lighting":
            "ILUMINACIÓN",

        "details.manufacturing.value":
            "IMPRESIÓN 3D FDM",

        "ask":
            "PEDÍ EL TUYO",

        "back":
            "VOLVER A PROYECTOS",

        "footer.tagline":
            "3D / DISEÑO / OBJETOS",

        "nav.home": "INICIO",
        "nav.projects": "PROYECTOS",
        "nav.about": "SOBRE MÍ",
        "nav.contact": "CONTACTO"

    }

};


// =========================
// APPLY LANGUAGE
// =========================

const languageButtons =
    document.querySelectorAll(".language-button");


function setProjectLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    document.documentElement.lang = language;


    // Normal text
    document
        .querySelectorAll("[data-i18n]")
        .forEach((element) => {

            const key = element.dataset.i18n;
            const translation =
                translations[language][key];

            if (translation) {
                element.textContent = translation;
            }

        });


    // HTML text
    document
        .querySelectorAll("[data-i18n-html]")
        .forEach((element) => {

            const key = element.dataset.i18nHtml;
            const translation =
                translations[language][key];

            if (translation) {
                element.innerHTML = translation;
            }

        });


    // Buttons
    languageButtons.forEach((button) => {

        const isActive =
            button.dataset.lang === language;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-pressed",
            isActive ? "true" : "false"
        );

    });


    // Remember language
    localStorage.setItem(
        "nordlab-language",
        language
    );
}


// =========================
// LANGUAGE BUTTONS
// =========================

languageButtons.forEach((button) => {

    button.addEventListener("click", () => {

        setProjectLanguage(
            button.dataset.lang
        );

    });

});


// =========================
// INITIAL LANGUAGE
// =========================

const savedLanguage =
    localStorage.getItem("nordlab-language") || "en";

setProjectLanguage(savedLanguage);