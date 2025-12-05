import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const GitHubRepos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [repoCount, setRepoCount] = useState('5');
    const loadGitHubData = async () => {
        const count = repoCount;
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=${count}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!response.ok) {
                throw new Error(`GitHub API error! status: ${response.status}`);
            }
            const data = await response.json();
            setRepos(data.items || []);
        }
        catch (error) {
            console.error('Error fetching GitHub data:', error);
            setError('Failed to load GitHub data. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const clearData = () => {
        setRepos([]);
        setError('');
    };
    return (_jsx("main", { className: "main-content", children: _jsxs("div", { className: "container", children: [_jsx("h2", { children: "Popular GitHub Repositories" }), _jsxs("div", { className: "controls", children: [_jsx("label", { htmlFor: "repoCount", children: "Number of repos:" }), _jsxs("select", { id: "repoCount", value: repoCount, onChange: (e) => setRepoCount(e.target.value), children: [_jsx("option", { value: "3", children: "3" }), _jsx("option", { value: "5", children: "5" }), _jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "15", children: "15" })] }), _jsx("button", { id: "loadRepos", className: "btn", onClick: loadGitHubData, disabled: loading, children: "Get Repositories!" }), _jsx("button", { id: "clearRepos", className: "btn btn-secondary", onClick: clearData, children: "Clear" })] }), _jsxs("div", { id: "loading", className: `loading ${loading ? '' : 'hidden'}`, children: [_jsx("div", { className: "spinner" }), _jsx("p", { children: "Loading GitHub repositories..." })] }), _jsx("div", { id: "error", className: `error ${error ? '' : 'hidden'}`, children: _jsx("p", { children: error }) }), _jsx("div", { id: "reposContainer", className: "facts-container", children: repos.map((repo, index) => (_jsxs("div", { className: "fact-card", children: [_jsxs("div", { className: "fact-number", children: ["Repository #", index + 1] }), _jsx("h3", { className: "repo-name", children: repo.name }), _jsx("p", { className: "repo-description", children: repo.description || 'No description available' }), _jsxs("div", { className: "repo-stats", children: [_jsxs("span", { className: "stat", children: ["\u2B50 ", repo.stargazers_count.toLocaleString(), " stars"] }), _jsxs("span", { className: "stat", children: ["\uD83C\uDF74 ", repo.forks_count.toLocaleString(), " forks"] }), _jsx("span", { className: "stat", children: repo.language || 'Not specified' })] }), _jsx("a", { href: repo.html_url, target: "_blank", rel: "noopener noreferrer", className: "repo-link", children: "View on GitHub" })] }, repo.id))) })] }) }));
};
export default GitHubRepos;
