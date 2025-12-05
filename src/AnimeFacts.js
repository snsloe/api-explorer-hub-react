import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const AnimeFacts = () => {
    const [animes, setAnimes] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState('');
    const [displayItems, setDisplayItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [factCount, setFactCount] = useState('5');
    useEffect(() => {
        const loadAnimeList = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=20');
                if (!response.ok) {
                    throw new Error(`API error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.data) {
                    setAnimes(data.data);
                    if (data.data.length > 0) {
                        setSelectedAnime(data.data[0].mal_id.toString());
                    }
                }
                else {
                    throw new Error('Invalid API response format');
                }
            }
            catch (error) {
                console.error('Error loading anime list:', error);
                setError('Failed to load anime list. Please try again later.');
            }
            finally {
                setLoading(false);
            }
        };
        loadAnimeList();
    }, []);
    const loadAnimeFacts = async () => {
        if (!selectedAnime) {
            setError('Please select an anime first!');
            return;
        }
        setLoading(true);
        setError('');
        setDisplayItems([]);
        try {
            const selectedAnimeData = animes.find(a => a.mal_id.toString() === selectedAnime);
            if (!selectedAnimeData) {
                throw new Error('Selected anime not found');
            }
            const response = await fetch(`https://api.jikan.moe/v4/anime/${selectedAnime}`);
            if (!response.ok) {
                throw new Error(`API error! status: ${response.status}`);
            }
            const data = await response.json();
            displayAnimeInfo(data.data, selectedAnimeData, parseInt(factCount));
        }
        catch (error) {
            console.error('Error loading anime facts:', error);
            setError('Failed to load anime information. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const generateFactsFromData = (anime, count) => {
        const facts = [];
        if (anime.synopsis) {
            facts.push({
                fact_id: 1,
                fact: `Synopsis: ${anime.synopsis.substring(0, 200)}...`
            });
        }
        if (anime.background) {
            facts.push({
                fact_id: 2,
                fact: `Background: ${anime.background.substring(0, 150)}...`
            });
        }
        if (anime.aired?.from) {
            const date = new Date(anime.aired.from).getFullYear();
            facts.push({
                fact_id: 3,
                fact: `First aired in ${date}`
            });
        }
        if (anime.genres?.length > 0) {
            const genres = anime.genres.map(g => g.name).join(', ');
            facts.push({
                fact_id: 4,
                fact: `Genres: ${genres}`
            });
        }
        if (anime.studios?.length > 0) {
            const studios = anime.studios.map(s => s.name).join(', ');
            facts.push({
                fact_id: 5,
                fact: `Studio: ${studios}`
            });
        }
        if (anime.rating) {
            facts.push({
                fact_id: 6,
                fact: `Rating: ${anime.rating}`
            });
        }
        if (anime.themes?.length > 0) {
            const themes = anime.themes.map(t => t.name).join(', ');
            facts.push({
                fact_id: 7,
                fact: `Themes: ${themes}`
            });
        }
        if (anime.demographics?.length > 0) {
            const demographics = anime.demographics.map(d => d.name).join(', ');
            facts.push({
                fact_id: 8,
                fact: `Demographic: ${demographics}`
            });
        }
        return facts.slice(0, count);
    };
    const displayAnimeInfo = (animeDetail, animeBasic, factCount) => {
        const facts = generateFactsFromData(animeDetail, factCount);
        const header = {
            type: 'header',
            title: animeBasic.title,
            image: animeBasic.images?.jpg?.image_url,
            score: animeDetail.score,
            episodes: animeDetail.episodes,
            status: animeDetail.status
        };
        setDisplayItems([header, ...facts]);
    };
    const clearData = () => {
        setDisplayItems([]);
        setError('');
    };
    return (_jsx("main", { className: "main-content", children: _jsxs("div", { className: "container", children: [_jsx("h2", { children: "Random Anime Facts" }), _jsxs("div", { className: "controls", children: [_jsx("label", { htmlFor: "animeSelect", children: "Select Anime:" }), _jsx("select", { id: "animeSelect", value: selectedAnime, onChange: (e) => setSelectedAnime(e.target.value), disabled: loading, children: animes.length === 0 ? (_jsx("option", { value: "", children: "Select an anime..." })) : (_jsxs(_Fragment, { children: [_jsx("option", { value: "", children: "Select an anime..." }), animes.map((anime) => (_jsx("option", { value: anime.mal_id.toString(), children: anime.title }, anime.mal_id)))] })) }), _jsx("label", { htmlFor: "factCount", children: "Facts to show:" }), _jsxs("select", { id: "factCount", value: factCount, onChange: (e) => setFactCount(e.target.value), children: [_jsx("option", { value: "3", children: "3" }), _jsx("option", { value: "5", children: "5" }), _jsx("option", { value: "7", children: "7" })] }), _jsx("button", { id: "loadFacts", className: "btn", onClick: loadAnimeFacts, disabled: loading, children: "Get Anime Facts!" }), _jsx("button", { id: "clearFacts", className: "btn btn-secondary", onClick: clearData, children: "Clear" })] }), _jsx("p", { style: { fontSize: '0.9rem', color: '#666', textAlign: 'center', marginTop: '-1.5rem', marginBottom: '1.0rem' }, children: "\u0415\u0441\u043B\u0438 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u044E\u0442\u0441\u044F, \u0441\u0442\u043E\u0438\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C VPN" }), _jsxs("div", { id: "loading", className: `loading ${loading ? '' : 'hidden'}`, children: [_jsx("div", { className: "spinner" }), _jsx("p", { children: "Loading anime facts..." })] }), _jsx("div", { id: "error", className: `error ${error ? '' : 'hidden'}`, children: _jsx("p", { children: error }) }), _jsx("div", { id: "factsContainer", className: "facts-container", children: displayItems.map((item, index) => {
                        if ('type' in item && item.type === 'header') {
                            return (_jsxs("div", { className: "fact-card anime-header-card", children: [_jsx("h3", { style: { marginBottom: '1rem', fontSize: '1.5rem' }, children: item.title }), item.image && (_jsx("img", { src: item.image, alt: item.title, style: {
                                            maxWidth: '200px',
                                            borderRadius: '8px',
                                            marginBottom: '1rem',
                                            border: '3px solid white'
                                        } })), _jsxs("div", { style: {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '1rem',
                                            flexWrap: 'wrap',
                                            marginTop: '1rem'
                                        }, children: [item.score && _jsxs("span", { children: ["\u2B50 ", item.score, "/10"] }), item.episodes && _jsxs("span", { children: ["\uD83C\uDFAC ", item.episodes, " eps"] }), item.status && _jsxs("span", { children: ["\uD83D\uDCCA ", item.status] })] })] }, "header"));
                        }
                        const fact = item;
                        return (_jsxs("div", { className: "fact-card", children: [_jsxs("div", { className: "fact-number", children: ["Fact #", fact.fact_id] }), _jsx("div", { className: "fact-text", children: fact.fact })] }, index));
                    }) })] }) }));
};
export default AnimeFacts;
