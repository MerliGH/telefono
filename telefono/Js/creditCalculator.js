export function calculateCredit(precio, plazo, enganchePorcentaje) {
    // Validación
    if (!precio || !plazo || !enganchePorcentaje) {
        throw new Error("Parámetros incompletos");
    }

    const enganche = precio * (enganchePorcentaje / 100);
    const S0 = precio - enganche;
    const pasos = 10000; // Alta precisión
    let totalInteres = 0;
    const tablaAmortizacion = [];

    // 1. Integral doble para el interés total (tu fórmula original)
    for (let tau = 0; tau <= plazo; tau += plazo/pasos) {
        const saldoTau = S0 * (1 - tau/plazo);
        const rTau = 0.12 * Math.exp(-0.05 * tau); // r(τ) = 12% * e^(-0.05τ)
        totalInteres += (rTau + (1/plazo)) * saldoTau * (plazo/pasos);
    }

    // 2. Generación de la tabla de amortización con integrales por mes
    let saldo = S0;
    const cuota = (S0 + totalInteres) / plazo;

    for (let mes = 1; mes <= plazo; mes++) {
        // Integral para el mes actual (de τ=mes-1 a τ=mes)
        let interesMes = 0;
        const subPasos = 1000; // Precisión intra-mes
        for (let tau = mes-1; tau < mes; tau += 1/subPasos) {
            const saldoTau = S0 * (1 - tau/plazo);
            const rTau = 0.12 * Math.exp(-0.05 * tau);
            interesMes += (rTau + (1/plazo)) * saldoTau * (1/subPasos);
        }

        const capital = cuota - interesMes;
        saldo = Math.max(0, saldo - capital); // Evitar valores negativos

        tablaAmortizacion.push({
            mes,
            pago: mes === 1 ? (cuota + enganche).toFixed(2) : cuota.toFixed(2),
            interes: interesMes.toFixed(2),
            capital: capital.toFixed(2),
            saldo: saldo.toFixed(2)
        });

        // Ajuste final para saldo cero
        if (mes === plazo) {
            tablaAmortizacion[mes-1].saldo = "0.00";
        }
    }

    return {
        enganche: enganche.toFixed(2),
        cuotaMensual: cuota.toFixed(2),
        totalPagar: (enganche + S0 + totalInteres).toFixed(2),
        tablaAmortizacion
    };
}