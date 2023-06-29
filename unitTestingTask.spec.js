const unitTestingTask = require('./unitTestingTask');

const mockDate = new Date(Date.parse('2016-03-16T15:21:50.417'));

describe('testing unitTestingTtask arguement types', () => {
    test('unitTestingTask should throw an error if the argument is not a string', () => {
        const format = null;
        expect(() => unitTestingTask(format, mockDate)).toThrow(TypeError);
    })

    test('unitTestingTask should throw an error if the date argument is not an instance of Date or string', () => {
        expect(() => unitTestingTask('YYYY', null)).toThrow(TypeError)
    })
})

describe('formatting the date 2016-03-12T12:37:34:513 (mockDate)', () => {
    it.each([
        ['YYYY', mockDate, '2016'],
        ['YY', mockDate, '16']
    ])('format year', (format, date, result) => {
        expect(unitTestingTask(format, date)).toBe(result)
    })

    it.each([
        ['MMMM', mockDate, 'March'],
        ['MMM', mockDate, 'Mar'],
        ['M', mockDate, '3']
    ])('Format month', (format, date, result) => {
        expect(unitTestingTask(format, date)).toBe(result)
    })

    it.each([
        ['DDD', mockDate, 'Wednesday'],
        ['DD', mockDate, 'Wed'],
        ['D', mockDate, 'We'],
        ['d', mockDate, '16'],
    ])('Format day', (format, date, result) => {
        expect(unitTestingTask(format, date)).toBe(result)
    })  

    test('Should return PM', () => {
        expect(unitTestingTask('A', mockDate)).toBe('PM')
    })

    test('Should return pm', () => {
        expect(unitTestingTask('a', mockDate)).toBe('pm')
    })
})

describe('test date and time values with padded zeroes', () => {
    it.each([
        ['ff', mockDate, '417'],
        ['ss', mockDate, '50'],
        ['m', mockDate, '21'],
        ['mm', mockDate, '21'],
        ['hh', mockDate, '03'],
        ['h', mockDate, '3'],
        ['H', mockDate, '15'],
        ['HH', mockDate, '15'],
        ['dd', mockDate,'16'],
        ['MM', mockDate, '03'],
    ])('Format date', (format, date, result) => {
        expect(unitTestingTask(format, date)).toBe(result)
    })
})

describe('test language', () => {

    test('langugage should be en if the value is falsey', () => {
        expect(unitTestingTask.lang('')).toBe('en');
    })

    it.each([
        ['en', null, 'en'],
        ['uk', {}, 'uk'],
        ['fr', {}, 'fr'],
        ['ru', {}, 'ru'],
        ['pl', {}, 'pl'],
        ['tt', {}, 'tt']
    ])('expect the langugage to be correct', (lang, options, expectedLang) => {
        expect(unitTestingTask.lang(lang, options)).toBe(expectedLang)
    })
})

test('time stamp', () => {
    const dateUnix = mockDate.getTime();
    expect(unitTestingTask('YYYY', dateUnix)).toBe('2016')
})

describe('test formats', () => {
    it.each([
        ['ISODate', mockDate, '2016-03-16'],
        ['ISOTime', mockDate, '03:21:50'],
        ['ISODateTime', mockDate, '2016-03-16T03:21:50'],
    ])('correct format for values', (formatName, date, result) => {
        expect(unitTestingTask(formatName, date)).toBe(result);
    })
})

describe('test time zones', () => {
    it.each([
        ['ZZ', mockDate, '+0100'],
        ['Z', mockDate, '+01:00']
    ])('returns the correct time zone', (format, date, result) => {
        expect(unitTestingTask(format, date)).toBe(result)
    })
})
