export function transformFrequency(frequency) {
    const frequencyMap = {
        'diario': 'día',
        'semanal': 'semana',
        'mensual': 'mes'
    };
    return frequencyMap[frequency] || frequency;
}
