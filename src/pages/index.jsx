import Layout from "./Layout.jsx";

import Home from "./Home";

import Templates from "./Templates";

import AIBuilder from "./AIBuilder";

import Dashboard from "./Dashboard";

import Team from "./Team";

import Careers from "./Careers";

import Apply from "./apply";

import Contact from "./contact";

import Checkout from "./Checkout";

import PaymentSuccess from "./PaymentSuccess";

import PaymentCreditCard from "./PaymentCreditCard";

import PaymentBankTransfer from "./PaymentBankTransfer";

import PaymentBitcoin from "./PaymentBitcoin";

import PaymentUSDT from "./PaymentUSDT";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const PAGES = {
  Home: Home,

  Templates: Templates,

  AIBuilder: AIBuilder,

  Dashboard: Dashboard,

  Team: Team,

  Careers: Careers,

  Apply: Apply,

  careers: careers,

  apply: apply,

  contact: Contact,

  Checkout: Checkout,

  PaymentSuccess: PaymentSuccess,

  PaymentCreditCard: PaymentCreditCard,

  PaymentBankTransfer: PaymentBankTransfer,

  PaymentBitcoin: PaymentBitcoin,

  PaymentUSDT: PaymentUSDT,
};

function _getCurrentPage(url) {
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  let urlLastPart = url.split("/").pop();
  if (urlLastPart.includes("?")) {
    urlLastPart = urlLastPart.split("?")[0];
  }

  const pageName = Object.keys(PAGES).find(
    (page) => page.toLowerCase() === urlLastPart.toLowerCase()
  );
  return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);

  return (
    <Layout currentPageName={currentPage}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Home" element={<Home />} />

        <Route path="/Templates" element={<Templates />} />

        <Route path="/AIBuilder" element={<AIBuilder />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Team" element={<Team />} />

        <Route path="/Careers" element={<Careers />} />

        <Route path="/Apply" element={<Apply />} />

        <Route path="/careers" element={<careers />} />

        <Route path="/apply" element={<apply />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/Checkout" element={<Checkout />} />

        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />

        <Route path="/PaymentCreditCard" element={<PaymentCreditCard />} />

        <Route path="/PaymentBankTransfer" element={<PaymentBankTransfer />} />

        <Route path="/PaymentBitcoin" element={<PaymentBitcoin />} />

        <Route path="/PaymentUSDT" element={<PaymentUSDT />} />
      </Routes>
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}
