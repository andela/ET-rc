import introJs from "intro.js";

const firstSteps = {
  steps: [
    {
      intro: "You are on a tour for setting up a product. Your tour will be complete in a minute."
    },
    {
      element: ".toolbar-vertical",
      intro: "This is the vendors toolbar."
      + " The toolbar contains all the links you need to setup your store."
      + " You can always click the site icon on the top to start."
    },
    {
      element: ".fa-plus",
      intro: "You can always click the button to add a new product to your store. "
      + "A new product can only be visible to your customers when you double click on that product and publish.",
      position: "left"
    },
    {
      element: ".fa-undo",
      intro: "If you do not like the modifications you made on a product, "
      + "you can click this button to undo the modification when the product is highlighted.",
      position: "bottom"
    },
    {
      element: ".fa-archive",
      intro: "Products can be archive by clicking this button when the product is highlighted."
      + " Archived products are saved for future modifications.",
      position: "bottom"
    },
    {
      element: ".fa-eye",
      intro: "You can click this button to make your store public or private."
      + " Your customers will not see your store if it is private.",
      position: "bottom"
    },
    {
      element: ".switch-control",
      intro: "You can click on the button to enable/disable edit mode."
      + " Your products and store cannot be modified when you edit mode is off.",
      position: "bottom"
    },
    {
      element: ".product-grid-item",
      intro: "This is a product in your store. "
      + "You can double click on each product to change its details. "
      + "When a product is modified, you must click the 'Publish' link above so that customers can see these changes.",
      position: "right"
    }
  ]
};

const productSteps = {
  steps: [
    {
      element: ".text-edit-input",
      intro: "This text field is where you enter the title of your product. "
      + "It is recommended to keep the title brief and in sentence case so that your "
      + "product will be consistent with other products."
    },
    {
      element: ".pageTitle-edit-input",
      intro: "You can add the products subtitle here. This field is optional."
    },
    {
      element: ".rui .gallery-drop-pane",
      intro: "This section shows your product's default image. This image will appear first in your store."
      + "You can also click the image thumbnail below to add more images to the product.",
      position: "right"
    },
    {
      element: ".undefined-edit-input",
      intro: "You can enter the product details in this text area. An instance of a product detail is shown in the text area.",
      position: "left"
    },
    {
      element: ".variant-list",
      intro: "You can add more product variant here. For instance, if you sell a white and a black LG speaker, "
      + "you may want to add these variants and their prices separately.",
      position: "left"
    }
  ]
};

const startIntro = (steps, nextPage = false) => {
  const intro = introJs();
  intro.setOptions(steps);
  return nextPage ? intro.start().setOption("doneLabel", "NextPage").oncomplete(() => {
    window.location.href = "/product/example-product?multipage=true";
  }) : intro.start();
};

export { startIntro, firstSteps, productSteps };

