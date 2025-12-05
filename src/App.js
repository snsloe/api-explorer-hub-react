import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import GitHubRepos from './GitHubRepos';
import AnimeFacts from './AnimeFacts';
import DotaRankings from './DotaRankings';
import './index.css';
const App = () => {
    return (_jsx(Router, { children: _jsxs("div", { id: "app", children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/github-repos", element: _jsx(GitHubRepos, {}) }), _jsx(Route, { path: "/anime-facts", element: _jsx(AnimeFacts, {}) }), _jsx(Route, { path: "/dota-rankings", element: _jsx(DotaRankings, {}) })] })] }) }));
};
export default App;
