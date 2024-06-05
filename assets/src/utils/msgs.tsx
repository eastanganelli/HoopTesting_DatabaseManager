export interface responseTypeData<T> {
    status: boolean;
    msg:    string;
    data:   T;
};

export interface responseTypeStatus {
    status: boolean;
    msg:    string;
};

export const FormMsgsError = "Por favor, completar todos los campos!";

export const StandardMsgs = {
    success: {
        select: "Estandardes seleccionados con éxito!",
        create: "Estandard creado con éxito!",
        update: "Estandard actualizado con éxito!",
        delete: "Estandard eliminado con éxito!"
    },
    error: {
        select: "Error al seleccionar los estandares!",
        create: "Error al crear el estandard!",
        update: "Error al actualizar el estandard!",
        delete: "Error al eliminar el estandard!"
    }
};

export const EndCapMsgs = {
    success: {
        create: "EndCap creado con éxito!",
        update: "EndCap actualizado con éxito!",
        delete: "EndCap eliminado con éxito!"
    },
    error: {
        create: "Error al crear el EndCap!",
        update: "Error al actualizar el EndCap!",
        delete: "Error al eliminar el EndCap!"
    }
};

export const EnviromentMsgs = {
    success: {
        create: "Ambiente creado con éxito!",
        update: "Ambiente actualizado con éxito!",
        delete: "Ambiente eliminado con éxito!"
    },
    error: {
        create: "Error al crear el ambiente!",
        update: "Error al actualizar el ambiente!",
        delete: "Error al eliminar el ambiente!"
    }
};

export const ConditionalPeriodMsgs = {
    success: {
        create: "Periodo condicional creado con éxito!",
        update: "Periodo condicional actualizado con éxito!",
        delete: "Periodo condicional eliminado con éxito!"
    },
    error: {
        create: "Error al crear el periodo condicional!",
        update: "Error al actualizar el periodo condicional!",
        delete: "Error al eliminar el periodo condicional!"
    }
};

export const MaterialRelatedMsgs = {
    success: {
        select: "Materiales relacionados seleccionados con éxito!",
        create: "Material relacionado creado con éxito!",
        update: "Material relacionado actualizado con éxito!",
        delete: "Material relacionado eliminado con éxito!"
    },
    error: {
        select: "Error al seleccionar los materiales relacionados!",
        create: "Error al crear el material relacionado!",
        update: "Error al actualizar el material relacionado!",
        delete: "Error al eliminar el material relacionado!"
    }
};