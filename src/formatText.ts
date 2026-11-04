export function formatText(
  text: string,
  variables: Record<string, string | number>,
): string {
  return text.replace(/\{([^{}]+)\}/g, (_match, variable: string) => {
    if (!(variable in variables)) {
      throw new Error(`Missing text variable: ${variable}`);
    }
    return String(variables[variable]);
  });
}
