document.addEventListener('DOMContentLoaded', function() {
    // Tree planting functionality
    const worldMap = document.querySelector('.world-map');
    const treeCounter = document.getElementById('total-trees');
    const donateBtn = document.getElementById('donate-btn');
    const modal = document.getElementById('thank-you-modal');
    const closeModal = document.querySelector('.close-modal');
    const shareBtn = document.getElementById('share-btn');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('custom-amount');
    
    let totalTrees = 12476; // Starting with some trees already planted
    
    // Initialize tree counter
    updateTreeCounter();
    
    // Add some initial trees
    for (let i = 0; i < 20; i++) {
        addRandomTree();
    }
    
    // Amount button selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            customAmount.value = '';
        });
    });
    
    customAmount.addEventListener('focus', function() {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });
    
    // Donation button click
    donateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        const inputs = document.querySelectorAll('.payment-info input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) return;
        
        // Get donation amount
        let amount = 0;
        const activeBtn = document.querySelector('.amount-btn.active');
        
        if (activeBtn) {
            amount = parseFloat(activeBtn.getAttribute('data-amount'));
        } else if (customAmount.value) {
            amount = parseFloat(customAmount.value);
        }
        
        if (amount <= 0) {
            alert('Please select or enter a valid donation amount');
            return;
        }
        
        // Plant trees based on amount
        const treesToPlant = Math.floor(amount / 10); // $10 per tree
        for (let i = 0; i < treesToPlant; i++) {
            setTimeout(() => {
                addRandomTree();
                totalTrees++;
                updateTreeCounter();
            }, i * 200);
        }
        
        // Show thank you modal
        setTimeout(() => {
            modal.style.display = 'flex';
        }, treesToPlant * 200);
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Share button
    shareBtn.addEventListener('click', function() {
        alert('Thank you for sharing! Imagine this would post to social media with your impact.');
    });
    
    // Function to add a random tree to the map
    function addRandomTree() {
        const tree = document.createElement('div');
        tree.className = 'tree';
        tree.innerHTML = '<i class="fas fa-tree"></i>';
        
        // Random position (avoiding oceans as much as possible)
        const left = 10 + Math.random() * 80;
        let top;
        
        // Adjust for map distortion
        if (left > 15 && left < 30) { // Africa
            top = 60 + Math.random() * 25;
        } else if (left > 30 && left < 50) { // Asia
            top = 30 + Math.random() * 40;
        } else if (left > 50 && left < 70) { // Americas
            top = 30 + Math.random() * 50;
        } else if (left > 70 && left < 85) { // North America
            top = 20 + Math.random() * 40;
        } else { // Europe and others
            top = 30 + Math.random() * 30;
        }
        
        tree.style.left = `${left}%`;
        tree.style.top = `${top}%`;
        
        worldMap.appendChild(tree);
    }
    
    // Update tree counter with animation
    function updateTreeCounter() {
        const target = totalTrees;
        const current = parseInt(treeCounter.textContent.replace(/,/g, ''));
        const increment = target > current ? 1 : -1;
        
        if (current !== target) {
            setTimeout(() => {
                treeCounter.textContent = (current + increment).toLocaleString() + ' trees planted worldwide';
                updateTreeCounter();
            }, 10);
        } else {
            treeCounter.textContent = target.toLocaleString() + ' trees planted worldwide';
        }
    }
    
    // Initialize chart
    const ctx = document.getElementById('countryChart').getContext('2d');
    const countryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sweden', 'Germany', 'USA', 'China', 'India', 'Brazil', 'Australia'],
            datasets: [
                {
                    label: 'CO2 Emissions (tons per capita)',
                    data: [4.5, 8.4, 15.5, 7.4, 1.9, 2.3, 16.3],
                    backgroundColor: '#e53935',
                    borderColor: '#c62828',
                    borderWidth: 1
                },
                {
                    label: 'Renewable Energy (%)',
                    data: [54, 42, 20, 28, 38, 45, 21],
                    backgroundColor: '#43a047',
                    borderColor: '#2e7d32',
                    borderWidth: 1
                },
                {
                    label: 'Climate Policy Score (0-100)',
                    data: [85, 78, 62, 58, 65, 72, 54],
                    backgroundColor: '#1e88e5',
                    borderColor: '#1565c0',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: false,
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
});