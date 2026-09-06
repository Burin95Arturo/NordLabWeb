// =========================
// BASIC SITE BEHAVIOR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================
// NAVIGATION
// =========================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});


// =========================
// SERVICE / FILE UPLOAD
// =========================

const serviceOptions = document.querySelectorAll(
  'input[name="service"]'
);

const fileUploadField = document.getElementById(
  "file-upload-field"
);

function updateFileUpload(option) {
  if (!fileUploadField) return;

  const needsFile =
    option.value === "3D Printing" ||
    option.value === "3D Modeling + Printing";

  fileUploadField.hidden = !needsFile;
}

serviceOptions.forEach((option) => {
  option.addEventListener("change", () => {
    updateFileUpload(option);
  });
});


// =========================
// WHAT WE DO → CONTACT
// =========================

const serviceItems = document.querySelectorAll(
  ".service-item[data-service]"
);

const contactSection = document.getElementById("contact");

function selectService(service) {
  const option = document.querySelector(
    `input[name="service"][value="${service}"]`
  );

  if (!option) return;

  option.checked = true;

  option.dispatchEvent(
    new Event("change", { bubbles: true })
  );

  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

serviceItems.forEach((item) => {

  item.addEventListener("click", () => {
    selectService(item.dataset.service);
  });

  item.addEventListener("keydown", (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      selectService(item.dataset.service);
    }

  });

});


// =========================
// LANGUAGE
// =========================

const translations = {

  en: {

    "nav.home": "HOME",
    "nav.projects": "PROJECTS",
    "nav.about": "ABOUT",
    "nav.contact": "CONTACT",

    "hero.eyebrow": "3D DESIGN & MAKING",
    "hero.title": "IDEAS <span>&amp;</span> OBJECTS",
    "hero.description":
      "Exploring ideas and bringing them to life through 3D modeling, printing, prototyping and custom design.",
    "hero.button": "VIEW PROJECTS",

    "projects.title": "FEATURED PROJECTS",

    "projects.nordic.category":
      "Product Design / 3D Modeling",

    "projects.mickey.category":
      "3D Printing",

    "projects.bed.category":
      "Custom Design",

    "projects.janukiots.category":
      "3D Souvenires",

    "projects.birth.category":
      "3D Lamp",

    "services.title": "WHAT WE DO",

    "services.printing.description":
      "Bring existing or print-ready 3D models into the physical world through 3D printing.",

    "services.modeling.description":
      "Turn an idea, reference, object or concept into a custom 3D model ready for your project.",

    "services.full.description":
      "From the initial idea to the final object. We handle the complete modeling and printing process.",

    "about.eyebrow":
      "ABOUT NORDLAB",

    "about.title":
      "Ideas into <span>real objects.</span>",

    "about.description":
      "NordLab began in 2020 as a small space for exploring 3D design and making. Over time, we grew by incorporating new technologies, techniques and tools, turning ideas into real objects and taking on an increasingly wide range of projects. Today, NordLab brings together 3D modeling, 3D printing, prototyping and custom design, with a focus on functionality, detail and finding the right solution for each project.",

    "contact.eyebrow":
      "LET'S WORK TOGETHER",

    "contact.title":
      "Have a project in mind?",

    "contact.description":
      "Tell us what you need and we'll get back to you with the next steps.",

    "form.serviceTitle":
      "01 / WHAT DO YOU NEED?",

    "form.detailsTitle":
      "02 / PROJECT DETAILS",

    "form.name":
      "NAME",

    "form.namePlaceholder":
      "Your name",

    "form.email":
      "EMAIL",

    "form.description":
      "TELL US ABOUT YOUR PROJECT",

    "form.descriptionPlaceholder":
      "Describe your idea, what you need, dimensions, quantity or any other information that may help...",

    "about.3dmodeling.title":
      "Turn an idea, reference or object into a 3D model.",

    "about.3dmodelingprinting.title":
      "From the initial idea to the final printed object.",

    "about.3dprinting.title":
      "Print an existing or print-ready 3D model.",

    "form.upload":
      "UPLOAD 3D MODEL",

    "form.optional":
      "OPTIONAL",

    "form.acceptedFiles":
      "Accepted files: .STL / .3MF",

    "form.submit":
      "SEND INQUIRY",

    "form.note":
      "We'll review your request and get back to you.",

    "about.message.description":
      "Describe your idea, what you need, dimensions, quantity or any other information that may help...",

    "project.title": "Nordic Lamp",
    "project.category": "Product Design / 3D Modeling",

    "project.description":
      "A custom 3D modeled lamp designed for ...",

    "details.material":
      "Material",

    "details.material.value":
      "PLA"
  },


  es: {

    "nav.home": "INICIO",
    "nav.projects": "PROYECTOS",
    "nav.about": "SOBRE NORDLAB",
    "nav.contact": "CONTACTO",

    "hero.eyebrow": "DISEÑO 3D & FABRICACIÓN",
    "hero.title": "IDEAS <span>&amp;</span> OBJETOS",
    "hero.description":
      "Exploramos ideas y las llevamos a la realidad mediante modelado 3D, impresión 3D, prototipado y diseño personalizado.",
    "hero.button": "VER PROYECTOS",

    "projects.title":
      "PROYECTOS DESTACADOS",

    "projects.nordic.category":
      "Diseño de Producto / Modelado 3D",

    "projects.mickey.category":
      "Impresión 3D",

    "projects.bed.category":
      "Diseño Personalizado",

    "about.3dprinting.title":
      "Imprimí un modelo 3D existente o listo para imprimir.",

    "about.3dmodelingprinting.title":
      "Desde la idea inicial hasta el objeto final impreso.",
    
    "about.3dmodeling.title":
      "Convertí una idea, referencia u objeto en un modelo 3D.",

    "about.message.description":
      "Describe tu idea, qué necesitás, dimensiones, cantidad o cualquier otro dato que pueda ayudar...",

    "projects.janukiots.category":
      "Souvenirs 3D",

    "projects.birth.category":
      "Lámpara 3D",

    "services.title":
      "QUÉ HACEMOS",

    "services.printing.description":
      "Llevamos modelos 3D existentes o listos para imprimir al mundo físico mediante impresión 3D.",

    "services.modeling.description":
      "Convertimos una idea, referencia, objeto o concepto en un modelo 3D personalizado para tu proyecto.",

    "services.full.description":
      "Desde la idea inicial hasta el objeto final. Nos encargamos de todo el proceso de modelado e impresión.",

    "about.eyebrow":
      "SOBRE NORDLAB",

    "about.title":
      "De las ideas a <span>objetos reales.</span>",

    "about.description":
      "NordLab comenzó en 2020 como un pequeño espacio para explorar el diseño 3D y la fabricación. Con el paso del tiempo, seguimos creciendo e incorporando nuevas tecnologías, técnicas y herramientas, transformando ideas en objetos reales y abordando una variedad cada vez mayor de proyectos. Hoy, NordLab reúne modelado 3D, impresión 3D, prototipado y diseño personalizado, con foco en la funcionalidad, el detalle y encontrar la solución adecuada para cada proyecto.",

    "contact.eyebrow":
      "TRABAJEMOS JUNTOS",

    "contact.title":
      "¿Tenés un proyecto en mente?",

    "contact.description":
      "Contanos qué necesitás y te responderemos con los próximos pasos.",

    "form.serviceTitle":
      "01 / ¿QUÉ NECESITÁS?",

    "form.detailsTitle":
      "02 / DETALLES DEL PROYECTO",

    "form.name":
      "NOMBRE",

    "form.namePlaceholder":
      "Tu nombre",

    "form.email":
      "EMAIL",

    "form.description":
      "CONTANOS SOBRE TU PROYECTO",

    "form.descriptionPlaceholder":
      "Describí tu idea, qué necesitás, dimensiones, cantidad o cualquier otro dato que pueda ayudar...",

    "form.upload":
      "SUBIR MODELO 3D",

    "form.optional":
      "OPCIONAL",

    "form.acceptedFiles":
      "Archivos aceptados: .STL / .3MF",

    "form.submit":
      "ENVIAR CONSULTA",

    "form.note":
      "Revisaremos tu solicitud y nos pondremos en contacto.",

     "project.title": "Lámpara Nórdica",
    "project.category":
      "Diseño de Producto / Modelado 3D",

    "project.description":
      "Una lámpara diseñada y modelada en 3D...",

    "details.material":
      "Material",

    "details.material.value":
      "PLA"

  }

};


// =========================
// APPLY LANGUAGE
// =========================

const languageButtons =
  document.querySelectorAll(".language-button");

const languageField =
  document.getElementById("language");

function setLanguage(language) {

  if (!translations[language]) {
    language = "en";
  }

  document.documentElement.lang = language;

  // Text
  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {

      const key = element.dataset.i18n;
      const translation = translations[language][key];

      if (translation) {
        element.textContent = translation;
      }

    });


  // HTML
  document
    .querySelectorAll("[data-i18n-html]")
    .forEach((element) => {

      const key = element.dataset.i18nHtml;
      const translation = translations[language][key];

      if (translation) {
        element.innerHTML = translation;
      }

    });


  // Placeholders
  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((element) => {

      const key =
        element.dataset.i18nPlaceholder;

      const translation =
        translations[language][key];

      if (translation) {
        element.placeholder = translation;
      }

    });


  // Language buttons
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


  // Form language
  if (languageField) {
    languageField.value = language;
  }


  // Save preference
  localStorage.setItem(
    "nordlab-language",
    language
  );
}


// =========================
// LANGUAGE BUTTON EVENTS
// =========================

languageButtons.forEach((button) => {

  button.addEventListener("click", () => {

    setLanguage(
      button.dataset.lang
    );

  });

});


// =========================
// INITIAL LANGUAGE
// =========================

const savedLanguage =
  localStorage.getItem("nordlab-language") || "en";

setLanguage(savedLanguage);