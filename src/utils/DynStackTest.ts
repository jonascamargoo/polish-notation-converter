import { DynamicStack} from "./DynamicStack";

const stack = new DynamicStack<string>();


stack.push("testando");
stack.push("um");
stack.push("dois");
stack.push("tres");

stack.print();



