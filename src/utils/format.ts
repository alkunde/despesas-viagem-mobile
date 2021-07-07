export function formatStringDate(date: string): string {
  const splitted = date.split('-');
  const newDate = new Date(+splitted[0], +splitted[1], +splitted[2]);

  return newDate.toLocaleDateString('pt-BR');
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR');
}
