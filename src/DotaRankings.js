import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const DotaRankings = () => {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rankingType, setRankingType] = useState('popularity');
    const loadRankings = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://api.opendota.com/api/heroStats');
            if (!response.ok) {
                throw new Error('Failed to load hero stats');
            }
            const heroStats = await response.json();
            displayHeroesRanking(heroStats, rankingType);
        }
        catch (error) {
            console.error('Error loading rankings:', error);
            setError('Failed to load rankings. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const displayHeroesRanking = (heroStats, rankingType) => {
        let sortedHeroes = [...heroStats];
        switch (rankingType) {
            case 'popularity':
                sortedHeroes.sort((a, b) => (b.pro_pick + b.pro_ban) - (a.pro_pick + a.pro_ban));
                break;
            case 'winrate':
                sortedHeroes.sort((a, b) => {
                    const aWinrate = (a.pro_win / a.pro_pick) || 0;
                    const bWinrate = (b.pro_win / b.pro_pick) || 0;
                    return bWinrate - aWinrate;
                });
                break;
            case 'matches':
                sortedHeroes.sort((a, b) => b.pro_pick - a.pro_pick);
                break;
        }
        const topHeroes = sortedHeroes.slice(0, 10);
        if (topHeroes.length === 0) {
            setError('No ranking data available');
            return;
        }
        const rankingsWithData = topHeroes.map((hero, index) => ({
            ...hero,
            rank: index + 1,
            winrate: hero.pro_pick > 0 ? ((hero.pro_win / hero.pro_pick) * 100).toFixed(1) : '0.0'
        }));
        setRankings(rankingsWithData);
    };
    const getHeroImageUrl = (hero) => {
        if (hero.name) {
            const heroName = hero.name.replace('npc_dota_hero_', '');
            return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`;
        }
        return '';
    };
    const getRankColor = (rank) => {
        if (rank === 1)
            return '#f1c40f';
        if (rank === 2)
            return '#bdc3c7';
        if (rank === 3)
            return '#cd7f32';
        return '#0366d6';
    };
    const getRankIcon = (rank) => {
        if (rank === 1)
            return '🥇';
        if (rank === 2)
            return '🥈';
        if (rank === 3)
            return '🥉';
        return '🏆';
    };
    const getRankingDescription = (rankingType) => {
        const descriptions = {
            'popularity': 'Based on total picks and bans in professional Dota 2 matches',
            'winrate': 'Heroes with the highest win rate in professional matches',
            'matches': 'Heroes played in the most professional matches'
        };
        return descriptions[rankingType] || 'Professional Dota 2 statistics';
    };
    const clearData = () => {
        setRankings([]);
        setError('');
    };
    return (_jsx("main", { className: "main-content", children: _jsxs("div", { className: "container", children: [_jsx("h2", { children: "Dota 2 Hero Rankings" }), _jsxs("div", { className: "controls", children: [_jsx("label", { htmlFor: "rankingType", children: "Ranking Type:" }), _jsxs("select", { id: "rankingType", value: rankingType, onChange: (e) => setRankingType(e.target.value), disabled: loading, children: [_jsx("option", { value: "popularity", children: "Most Popular Heroes" }), _jsx("option", { value: "winrate", children: "Highest Win Rate" }), _jsx("option", { value: "matches", children: "Most Played" })] }), _jsx("button", { id: "loadRankings", className: "btn", onClick: loadRankings, disabled: loading, children: "Load Rankings" }), _jsx("button", { id: "clearRankings", className: "btn btn-secondary", onClick: clearData, children: "Clear" })] }), _jsx("p", { style: { fontSize: '0.9rem', color: '#666', textAlign: 'center', marginTop: '-1.5rem', marginBottom: '1.0rem' }, children: "API \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0441 VPN" }), _jsxs("div", { id: "loading", className: `loading ${loading ? '' : 'hidden'}`, children: [_jsx("div", { className: "spinner" }), _jsx("p", { children: "Loading Dota 2 rankings..." })] }), _jsx("div", { id: "error", className: `error ${error ? '' : 'hidden'}`, children: _jsx("p", { children: error }) }), _jsxs("div", { id: "rankingsContainer", className: "facts-container", children: [rankings.length > 0 && (_jsx("div", { className: "fact-card", children: _jsx("h3", { style: { color: '#586069', margin: '0.5rem 0 0 0', textAlign: 'center' }, children: getRankingDescription(rankingType) }) })), rankings.map((hero) => (_jsxs("div", { className: `fact-card ${hero.rank <= 3 ? `rank-${hero.rank}` : ''}`, children: [_jsxs("div", { className: "fact-number", style: {
                                        color: getRankColor(hero.rank),
                                        borderLeftColor: getRankColor(hero.rank)
                                    }, children: [getRankIcon(hero.rank), " Rank #", hero.rank] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, children: [_jsx("img", { src: getHeroImageUrl(hero), alt: hero.localized_name, style: {
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '8px',
                                                border: `2px solid ${getRankColor(hero.rank)}`
                                            }, onError: (e) => {
                                                const target = e.target;
                                                target.style.display = 'none';
                                                const nextSibling = target.nextElementSibling;
                                                if (nextSibling) {
                                                    nextSibling.style.display = 'flex';
                                                    nextSibling.textContent = '🎮';
                                                }
                                            } }), _jsx("div", { className: "hero-avatar", style: {
                                                display: 'none',
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '8px',
                                                border: `2px solid ${getRankColor(hero.rank)}`,
                                                background: 'linear-gradient(45deg, #0366d6, #764ba2)',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '1.5rem'
                                            } }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("h3", { className: "repo-name", children: hero.localized_name }), _jsxs("p", { className: "repo-description", children: [rankingType === 'popularity' && `Popularity: ${(hero.pro_pick + hero.pro_ban).toLocaleString()} games`, rankingType === 'winrate' && `Win Rate: ${hero.winrate}%`, rankingType === 'matches' && `Matches: ${hero.pro_pick.toLocaleString()}`] }), _jsxs("div", { className: "repo-stats", children: [_jsxs("span", { className: "stat", children: ["\uD83D\uDCCA ", hero.winrate, "% win rate"] }), _jsxs("span", { className: "stat", children: ["\uD83C\uDFAF ", hero.pro_pick?.toLocaleString() || 0, " picks"] }), _jsxs("span", { className: "stat", children: ["\uD83D\uDEAB ", hero.pro_ban?.toLocaleString() || 0, " bans"] })] })] })] })] }, hero.hero_id)))] })] }) }));
};
export default DotaRankings;
