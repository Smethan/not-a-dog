import "./App.css";
import DogForm from "./Components/DogForm";
import Amplify from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  return (
    <div className="App">
      <DogForm />
    </div>
  );
}

export default App;
