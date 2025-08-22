// Quantum Random Number Generator JavaScript

class QuantumRNG {
    constructor() {
        this.generateBtn = document.getElementById('generate');
        this.loadingDiv = document.getElementById('loading');
        this.resultsDiv = document.getElementById('results');
        this.statsDiv = document.getElementById('stats');
        
        // Bind event listeners
        this.generateBtn.addEventListener('click', () => this.generateNumbers());
        
        // Add some visual flair
        this.createParticleEffect();
    }

    async generateNumbers() {
        // Get user inputs
        const bits = parseInt(document.getElementById('bits').value);
        const count = parseInt(document.getElementById('count').value);
        const format = document.getElementById('format').value;

        // Show loading state
        this.showLoading();

        try {
            // Simulate quantum computation delay
            await this.delay(1500);
            
            // Generate quantum random numbers
            const numbers = this.simulateQuantumGeneration(bits, count);
            
            // Display results
            this.displayResults(numbers, format);
            this.showStatistics(numbers);
            
        } catch (error) {
            this.showError('Quantum decoherence detected! Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    simulateQuantumGeneration(bits, count) {
        const numbers = [];
        const maxValue = Math.pow(2, bits) - 1;
        
        for (let i = 0; i < count; i++) {
            // Simulate quantum circuit: each bit has 50% probability
            let quantumNumber = 0;
            
            for (let bit = 0; bit < bits; bit++) {
                // Simulate quantum measurement (true randomness in real hardware)
                if (Math.random() < 0.5) {
                    quantumNumber |= (1 << bit);
                }
            }
            
            numbers.push(quantumNumber);
        }
        
        return numbers;
    }

    displayResults(numbers, format) {
        let html = '';
        
        numbers.forEach(number => {
            let displayValue;
            
            switch (format) {
                case 'binary':
                    const bits = parseInt(document.getElementById('bits').value);
                    displayValue = number.toString(2).padStart(bits, '0');
                    break;
                case 'hex':
                    displayValue = '0x' + number.toString(16).toUpperCase();
                    break;
                default:
                    displayValue = number.toString();
            }
            
            html += `<span class="number">${displayValue}</span>`;
        });

        this.resultsDiv.innerHTML = html;
    }

    showStatistics(numbers) {
        if (numbers.length === 0) return;

        const sum = numbers.reduce((a, b) => a + b, 0);
        const avg = (sum / numbers.length).toFixed(2);
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        const range = max - min;

        document.getElementById('avg').textContent = avg;
        document.getElementById('min').textContent = min;
        document.getElementById('max').textContent = max;
        document.getElementById('range').textContent = range;

        this.statsDiv.classList.remove('hidden');
    }

    showLoading() {
        this.generateBtn.disabled = true;
        this.loadingDiv.classList.remove('hidden');
    }

    hideLoading() {
        this.generateBtn.disabled = false;
        this.loadingDiv.classList.add('hidden');
    }

    showError(message) {
        this.resultsDiv.innerHTML = `<p style="color: #ff006e; text-align: center;">${message}</p>`;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    createParticleEffect() {
        // Add floating quantum particles
        const particles = document.getElementById('particles');
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? '#00d4ff' : '#8338ec';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.7 + 0.1;
            particle.style.animation = `float ${Math.random() * 15 + 5}s infinite ease-in-out`;
            
            particles.appendChild(particle);
        }
    }
}

// Add floating animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg); 
        }
        50% { 
            transform: translateY(-40px) translateX(-10px) rotate(180deg); 
        }
        75% { 
            transform: translateY(-20px) translateX(-15px) rotate(270deg); 
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuantumRNG();
    console.log('🌌 Quantum Random Number Generator initialized!');
});
