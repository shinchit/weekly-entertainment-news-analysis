// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // アニメーション設定
    setupAnimations();
    // チャート描画
    setupCharts();
});

// アニメーション設定
function setupAnimations() {
    // インパクトメーターのアニメーション
    const meters = document.querySelectorAll('.meter-fill');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const meter = entry.target;
                const width = meter.style.width;
                meter.style.width = '0%';
                setTimeout(() => {
                    meter.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);
    
    meters.forEach(meter => {
        observer.observe(meter);
    });
    
    // カードのホバーエフェクト
    const cards = document.querySelectorAll('.overview-card, .news-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// チャート設定
function setupCharts() {
    // ヒカルのSNS反応分析チャート
    const hikaruCtx = document.getElementById('hikaruChart');
    if (hikaruCtx) {
        new Chart(hikaruCtx, {
            type: 'doughnut',
            data: {
                labels: ['祝福', '驚き', '批判', '期待'],
                datasets: [{
                    data: [45, 30, 10, 15],
                    backgroundColor: [
                        '#48cae4',
                        '#feca57',
                        '#ff6b6b',
                        '#a8e6cf'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 橋本環奈の視聴率推移チャート
    const hashimotoCtx = document.getElementById('hashimotoChart');
    if (hashimotoCtx) {
        new Chart(hashimotoCtx, {
            type: 'line',
            data: {
                labels: ['おむすび開始', 'パワハラ報道', 'おむすび終了', '天久鷹央開始', '現在'],
                datasets: [{
                    label: '視聴率(%)',
                    data: [15.2, 13.8, 13.1, 6.3, 5.86],
                    borderColor: '#feca57',
                    backgroundColor: 'rgba(254, 202, 87, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 20,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // 島崎信長の出演作品ジャンル分布
    const shimazakiCtx = document.getElementById('shimazakiChart');
    if (shimazakiCtx) {
        new Chart(shimazakiCtx, {
            type: 'bar',
            data: {
                labels: ['アニメ', 'ゲーム', '吹き替え', 'ドラマCD', 'ラジオ'],
                datasets: [{
                    label: '出演作品数',
                    data: [85, 45, 20, 30, 15],
                    backgroundColor: [
                        '#48cae4',
                        '#a8e6cf',
                        '#ffd93d',
                        '#ff8fab',
                        '#c8d6e5'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // カテゴリ分布チャート
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'pie',
            data: {
                labels: ['結婚・恋愛', '視聴率・人気', '出産・家族', 'その他'],
                datasets: [{
                    data: [40, 35, 20, 5],
                    backgroundColor: [
                        '#ff6b6b',
                        '#feca57',
                        '#48cae4',
                        '#a8e6cf'
                    ],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// パフォーマンス監視
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Intersection Observer for lazy loading fallback
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}