CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.progresso
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();