document.addEventListener('DOMContentLoaded', function() {
    // Datos de los teléfonos
    const phones = [
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            price: 1299,
            image: "image/phone1.jpg",
            category: "premium",
            rating: 5,
            specs: [
                { name: "Pantalla", value: "6.7\" Super Retina XDR" },
                { name: "Procesador", value: "A17 Pro" },
                { name: "RAM", value: "8GB" },
                { name: "Almacenamiento", value: "256GB/512GB/1TB" },
                { name: "Cámara", value: "Triple 48MP + 12MP + 12MP" },
                { name: "Batería", value: "4422 mAh" },
                { name: "Sistema", value: "iOS 17" }
            ]
        },
        {
            id: 2,
            name: "Samsung Galaxy S23 Ultra",
            price: 1199,
            image: "image/phone2.jpg",
            category: "premium",
            rating: 5,
            specs: [
                { name: "Pantalla", value: "6.8\" Dynamic AMOLED 2X" },
                { name: "Procesador", value: "Snapdragon 8 Gen 2" },
                { name: "RAM", value: "12GB" },
                { name: "Almacenamiento", value: "256GB/512GB/1TB" },
                { name: "Cámara", value: "200MP + 12MP + 10MP + 10MP" },
                { name: "Batería", value: "5000 mAh" },
                { name: "Sistema", value: "Android 13" }
            ]
        },
        {
            id: 3,
            name: "Google Pixel 7 Pro",
            price: 899,
            image: "image/phone3.jpeg",
            category: "gama-media",
            rating: 4,
            specs: [
                { name: "Pantalla", value: "6.7\" LTPO AMOLED" },
                { name: "Procesador", value: "Google Tensor G2" },
                { name: "RAM", value: "12GB" },
                { name: "Almacenamiento", value: "128GB/256GB" },
                { name: "Cámara", value: "50MP + 12MP + 48MP" },
                { name: "Batería", value: "5000 mAh" },
                { name: "Sistema", value: "Android 13" }
            ]
        },
        {
            id: 4,
            name: "Xiaomi Redmi Note 12",
            price: 299,
            image: "image/phone4.jpg",
            category: "economico",
            rating: 3,
            specs: [
                { name: "Pantalla", value: "6.67\" AMOLED" },
                { name: "Procesador", value: "Snapdragon 685" },
                { name: "RAM", value: "6GB/8GB" },
                { name: "Almacenamiento", value: "128GB/256GB" },
                { name: "Cámara", value: "50MP + 8MP + 2MP" },
                { name: "Batería", value: "5000 mAh" },
                { name: "Sistema", value: "Android 12" }
            ]
        },
        {
            id: 5,
            name: "OnePlus 12",
            price: 1099,
            image: "image/1.jpg",
            category: "premium",
            rating: 4,
            specs: [
                { name: "Pantalla", value: "6.82\" Fluid AMOLED" },
                { name: "Procesador", value: "Snapdragon 8 Gen 3" },
                { name: "RAM", value: "12GB/16GB" },
                { name: "Almacenamiento", value: "256GB/512GB" },
                { name: "Cámara", value: "50MP + 48MP + 64MP" },
                { name: "Batería", value: "5400 mAh" },
                { name: "Sistema", value: "OxygenOS 14" }
            ]
        },
        {
            id: 6,
            name: "Motorola Moto G Power 5G",
            price: 599,
            image: "image/2.jpg",
            category: "economico",
            rating: 3,
            specs: [
                { name: "Pantalla", value: "6.5\" IPS LCD" },
                { name: "Procesador", value: "MediaTek Dimensity 930" },
                { name: "RAM", value: "4GB/6GB" },
                { name: "Almacenamiento", value: "64GB/128GB" },
                { name: "Cámara", value: "50MP + 2MP" },
                { name: "Batería", value: "5000 mAh" },
                { name: "Sistema", value: "Android 13" }
            ]
        }
    ];

    // Elementos del DOM
    const phonesContainer = document.querySelector('.phones-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const phoneGallery = document.querySelector('.phone-gallery');
    const phoneDetails = document.querySelector('.phone-details');
    const backButton = document.querySelector('.back-btn');
    const storageSelect = document.getElementById('storage');
    const colorSelect = document.getElementById('color');
    const finalPriceElement = document.getElementById('final-price');
    const quoteButton = document.querySelector('.quote-btn');
    const modal = document.querySelector('.modal');
    const modalPhoneName = document.getElementById('modal-phone-name');
    const modalFinalPrice = document.getElementById('modal-final-price');
    const modalCloseButtons = document.querySelectorAll('.close-modal, .modal-close-btn');
    const paymentMethod = document.getElementById('payment-method');
    const creditOptions = document.getElementById('credit-options');
    const engancheInput = document.getElementById('enganche');

    // Variables de estado
    let currentPhone = null;

    // Mostrar teléfonos en la galería
    function renderPhones(filter = 'all') {
        phonesContainer.innerHTML = '';
        
        const filteredPhones = filter === 'all' ? phones : phones.filter(phone => phone.category === filter);
        
        filteredPhones.forEach(phone => {
            const phoneCard = document.createElement('div');
            phoneCard.className = 'phone-card';
            phoneCard.dataset.id = phone.id;
            phoneCard.dataset.category = phone.category;
            
            phoneCard.innerHTML = `
                <div class="phone-image">
                    <img src="${phone.image}" alt="${phone.name}">
                </div>
                <div class="phone-info">
                    <h3>${phone.name}</h3>
                    <div class="rating">${'★'.repeat(phone.rating)}${'☆'.repeat(5 - phone.rating)}</div>
                    <p class="price">$${phone.price}</p>
                    <div class="phone-meta">
                        <span>${phone.specs[0].value}</span>
                        <span>${phone.specs[2].value}</span>
                    </div>
                    <button class="btn view-details-btn" data-id="${phone.id}">Ver detalles</button>
                </div>
            `;
            
            phonesContainer.appendChild(phoneCard);
        });
        
        document.querySelectorAll('.view-details-btn').forEach(button => {
            button.addEventListener('click', function() {
                const phoneId = parseInt(this.dataset.id);
                showPhoneDetails(phoneId);
            });
        });
    }

    // Mostrar detalles del teléfono
    function showPhoneDetails(phoneId) {
        currentPhone = phones.find(phone => phone.id === phoneId);
        
        document.getElementById('detail-img').src = currentPhone.image;
        document.getElementById('detail-img').alt = currentPhone.name;
        document.getElementById('detail-name').textContent = currentPhone.name;
        document.getElementById('detail-price').textContent = `$${currentPhone.price}`;
        
        const ratingElement = document.getElementById('detail-rating');
        ratingElement.innerHTML = `${'★'.repeat(currentPhone.rating)}${'☆'.repeat(5 - currentPhone.rating)}`;
        
        const specsList = document.getElementById('detail-specs');
        specsList.innerHTML = '';
        currentPhone.specs.forEach(spec => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${spec.name}:</span> <span>${spec.value}</span>`;
            specsList.appendChild(li);
        });
        
        updateFinalPrice();
        phoneGallery.classList.add('hidden');
        phoneDetails.classList.remove('hidden');
        phoneDetails.classList.add('show');
    }

    // Función para calcular cuotas de crédito
    function calcularCuotaCredito(precioBase, enganchePorcentaje, plazoMeses) {
        const tasaInteresMensual = 0.20;
        const enganche = precioBase * (enganchePorcentaje / 100);
        const saldo = precioBase - enganche;
        const factor = Math.pow(1 + tasaInteresMensual, plazoMeses);
        const cuotaMensual = saldo * (tasaInteresMensual * factor) / (factor - 1);
        const total = enganche + (cuotaMensual * plazoMeses);
        
        // Generar tabla de amortización
        let saldoPendiente = saldo;
        const amortizacion = [];
        
        for (let mes = 1; mes <= plazoMeses; mes++) {
            const interes = saldoPendiente * tasaInteresMensual;
            const capital = cuotaMensual - interes;
            
            amortizacion.push({
                mes,
                pago: cuotaMensual,
                interes,
                capital,
                saldo: saldoPendiente - capital
            });
            
            saldoPendiente -= capital;
        }
        
        return {
            enganche: enganche,
            cuota: cuotaMensual,
            total: total,
            intereses: total - precioBase,
            plazo: plazoMeses,
            amortizacion: amortizacion
        };
    }

    // Actualizar precio final
    function updateFinalPrice() {
        if (!currentPhone) return;
        
        const storagePrice = parseInt(storageSelect.value) === 64 ? 0 : 
                           parseInt(storageSelect.value) === 128 ? 50 : 100;
        
        const basePrice = currentPhone.price + storagePrice;
        const lowEngancheWarning = document.querySelector('.low-enganche-warning');
        if (paymentMethod.value === 'credito') {
            const enganchePorcentaje = parseInt(engancheInput.value);
            if (enganchePorcentaje < 10) {
                lowEngancheWarning.classList.remove('hidden');
            } else {
                lowEngancheWarning.classList.add('hidden');
            }
        } else {
            lowEngancheWarning.classList.add('hidden');
        }
        
        if (paymentMethod.value === 'contado') {
            const descuento = basePrice * 0.05;
            finalPriceElement.textContent = `$${(basePrice - descuento).toFixed(2)} (Ahorras $${descuento.toFixed(2)})`;
            document.getElementById('amortization-body').innerHTML = '';
            document.getElementById('amortization-body').innerHTML = ''; // Limpiar tabla
        } else {
            const enganchePorcentaje = parseInt(engancheInput.value);
            const plazo = parseInt(document.getElementById('plazo').value);
            const credito = calcularCuotaCredito(basePrice, enganchePorcentaje, plazo);

             // Actualizar tabla de amortización
        const amortBody = document.getElementById('amortization-body');
        amortBody.innerHTML = '';

        credito.amortizacion.forEach((pago) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pago.mes}</td>
                <td>$${pago.pago.toFixed(2)}</td>
                <td>$${pago.interes.toFixed(2)}</td>
                <td>$${pago.capital.toFixed(2)}</td>
                <td>$${pago.saldo.toFixed(2)}</td>
            `;
            amortBody.appendChild(row);
        });
            
            // Actualizar tabla de desglose
            document.getElementById('desglose-enganche').textContent = `$${credito.enganche.toFixed(2)}`;
            document.getElementById('desglose-intereses').textContent = `$${credito.intereses.toFixed(2)}`;
            document.getElementById('desglose-total').textContent = `$${credito.total.toFixed(2)}`;
            document.getElementById('desglose-mensualidades').textContent = `$${credito.cuota.toFixed(2)} x ${credito.plazo} meses`;
            
            finalPriceElement.innerHTML = `
                <strong>$${credito.total.toFixed(2)}</strong><br>
                <small>Enganche: $${credito.enganche.toFixed(2)} (${enganchePorcentaje}%)</small><br>
                <small>${credito.plazo} cuotas mensuales de $${credito.cuota.toFixed(2)}</small>
            `;
        }
    }

    // Event Listeners
    backButton.addEventListener('click', () => {
        phoneDetails.classList.remove('show');
        setTimeout(() => {
            phoneGallery.classList.remove('hidden');
            phoneDetails.classList.add('hidden');
        }, 300);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderPhones(this.dataset.filter);
        });
    });

    storageSelect.addEventListener('change', updateFinalPrice);
    colorSelect.addEventListener('change', updateFinalPrice);
    
    paymentMethod.addEventListener('change', function() {
        const isCredito = this.value === 'credito';
        creditOptions.classList.toggle('hidden', !isCredito);
        document.querySelector('.amortization-table').classList.toggle('hidden', !isCredito);
        updateFinalPrice();
    });


    engancheInput.addEventListener('input', function() {
        document.getElementById('enganche-value').textContent = `${this.value}%`;
        updateFinalPrice(); // Ya está implementado, pero se asegura la validación
    });

    engancheInput.addEventListener('change', function() {
        if (this.value < 0) this.value = 0;
        if (this.value > 100) this.value = 100;
    });


    quoteButton.addEventListener('click', () => {
        if (!currentPhone) return;
        modalPhoneName.textContent = currentPhone.name;
        modalFinalPrice.textContent = finalPriceElement.textContent;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.classList.add('hidden'), 300);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    });

    // Inicialización
    renderPhones();
});