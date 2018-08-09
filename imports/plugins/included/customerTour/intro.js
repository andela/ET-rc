import introJs from "intro.js";

const startIntro = () => {
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        intro: "Welcome to Et-world!, This should only take a few minutes.We'll go through a few things to get you up and running here. Ready?"
      },
      {
        element: document.querySelectorAll(".product-grid-item")[0],
        intro: `This is a product, Something you might want to buy There are a ton of them on our platform,
                check out some of them and get one or two. Click to get more information about the product`,
        position: "right"
      },
      {
        element: "#register",
        intro: "We'd love to have you as a user, please click here to sign in or sign up",
        position: "right"
      },
      {
        element: document.querySelectorAll(".currencies")[0],
        intro: `Specially for you! Clicking this will present you different currency options, anyone chosen will be the currency of 
                all the products in the store`,
        position: "right"
      },
      {
        element: document.querySelectorAll(".languages")[0],
        intro: "You can change the language of the application too! Just so you have a totally personal experience using ET-WORLD",
        position: "right"
      },
      {
        element: document.querySelectorAll(".cart")[0],
        intro: "Click here to go to your cart. The page will contain all the items you have ordered and haven't paid for(yet).",
        position: "left"
      },
      {
        intro: "And That's just the right information to get you started! Thank you!"
      }
    ]
  });
  return intro.start();
};

export default startIntro;
