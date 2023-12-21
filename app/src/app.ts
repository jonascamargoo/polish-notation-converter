import { ExpressionController } from "./controllers/ExpressionController.js";

const controller = new ExpressionController();
const swapBtn = document.querySelector('#swap') as HTMLButtonElement;
const solveBtn = document.querySelector('#solve') as HTMLButtonElement;

swapBtn.addEventListener('click', () => {
    controller.swapNotation();
});


solveBtn.addEventListener('click', () => {
    controller.solve();
});

