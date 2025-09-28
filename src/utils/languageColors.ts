const getLanguageColor = (language : string) => {
    if (!language) return 'transparent';

    const normalizedLang = language.trim().toLowerCase();

    const colorMap: Record<string, string> = {
        javascript: '#f1e05a',
        python: '#3572A5',
        java: '#b07219',
        'c++': '#f34b7d',
        c: '#555555',
        ruby: '#701516',
        swift: '#ffac45',
        go: '#00ADD8',
        php: '#4F5D95',
        html: '#e44b23',
        css: '#563d7c',
        kotlin: '#F18E33',
        'c#': '#178600',
        typescript: '#3178C6',
        nix: '#7e7eff',
        shell: '#89e051',
    };
    return colorMap[normalizedLang] || 'transparent';
};

export { getLanguageColor }