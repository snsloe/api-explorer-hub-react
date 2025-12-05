import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
    const location = useLocation();
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/github-repos': return 'GitHub Explorer';
            case '/anime-facts': return 'Anime Facts';
            case '/dota-rankings': return 'Dota 2 Rankings';
            default: return 'API Explorer';
        }
    };
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };
    return (_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "nav-container", children: [_jsx("h1", { className: "nav-logo", children: getPageTitle() }), _jsxs("ul", { className: "nav-menu", children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/", className: `nav-link ${isActive('/')}`, children: "Home" }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/github-repos", className: `nav-link ${isActive('/github-repos')}`, children: "GitHub Repos" }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/anime-facts", className: `nav-link ${isActive('/anime-facts')}`, children: "Anime Facts" }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/dota-rankings", className: `nav-link ${isActive('/dota-rankings')}`, children: "Dota 2 Rankings" }) })] })] }) }));
};
export default Navbar;
