import { ExpressionController } from "./controllers/ExpressionController";

const controller = new ExpressionController();

const mainContainer = document.querySelector('.main-container');
// If main-container exists (i.e., it is not null or undefined)...
if(mainContainer) {
    mainContainer.addEventListener('submit', event => {
        event.preventDefault();
        controller.solve();
    });
}   else {
    throw Error('Não foi possível inicializar a aplicação.')
}
