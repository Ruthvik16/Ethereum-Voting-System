// Import necessary modules and components
import "@/styles/globals.css";
import { VotingProvider } from "@/context/Voter";
// import NavBar from "../components/NavBar/NavBar";

// Export the App component as default
export default function App({ Component, pageProps }) {
  return (
    <VotingProvider>
      <div>
        {/* <NavBar /> */}
        <div>
          {/* Correctly render the Component */}
          <Component {...pageProps} />
        </div>
      </div>
    </VotingProvider>
  );
}
