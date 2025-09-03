import { useForm } from "react-hook-form";

export default function Contact() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const onSubmit = async (data) => {
        alert(`Gracias, ${data.name}! Te contactaremos a ${data.email}`);
        reset();
    };

    return (
        <section style={{ maxWidth: 640, margin: "24px auto", padding: "0 16px" }}>
            <h2 style={{ margin: "16px 0" }}>Contacto</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 12 }}>
                <div>
                    <label>Nombre</label>
                    <input
                        style={input}
                        {...register("name", { required: "El nombre es obligatorio", minLength: { value: 2, message: "Mínimo 2 caracteres" } })}
                        placeholder="Tu nombre"
                    />
                    {errors.name && <p style={err}>{errors.name.message}</p>}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        style={input}
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
                        })}
                        placeholder="tu@correo.com"
                    />
                    {errors.email && <p style={err}>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Mensaje</label>
                    <textarea
                        rows={4}
                        style={input}
                        {...register("message", { required: "Cuéntanos tu mensaje", minLength: { value: 10, message: "Mínimo 10 caracteres" } })}
                        placeholder="¿Qué te gustaría escuchar en Kodigo Music?"
                    />
                    {errors.message && <p style={err}>{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} style={btn}>
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </section>
    );
}

const input = {
    width: "100%", padding: "12px 14px", borderRadius: 12,
    border: "1px solid #ddd", outline: "none"
};
const btn = {
    padding: "12px 16px", borderRadius: 12, border: "none",
    background: "#111", color: "#fff", fontWeight: 700, cursor: "pointer"
};
const err = { color: "#b91c1c", marginTop: 6 };