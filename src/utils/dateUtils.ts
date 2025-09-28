import dayjs from 'dayjs';

export function getAgeFromEnvStamp(): number {
    const stamp = Number(import.meta.env.VITE_BIRTH_STAMP);
    const birthDate = dayjs(stamp);
    const today = dayjs();
    return today.diff(birthDate, 'year');
}