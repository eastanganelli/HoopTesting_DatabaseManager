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

/**
 * Standard Messages
 */
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
        create: "Tapa creada con éxito!",
        update: "Tapa actualizada con éxito!",
        delete: "Tapa eliminada con éxito!"
    },
    error: {
        create: "Error al crear la Tapa!",
        update: "Error al actualizar la Tapa!",
        delete: "Error al eliminar la Tapa!"
    }
};

export const EnviromentMsgs = {
    success: {
        create: "Entorno creado con éxito!",
        update: "Entorno actualizado con éxito!",
        delete: "Entorno eliminado con éxito!"
    },
    error: {
        create: "Error al crear el entorno!",
        update: "Error al actualizar el entorno!",
        delete: "Error al eliminar el entorno!"
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

export const TestTypeMsgs = {
    success: {
        create: "Tipo de prueba creado con éxito!",
        update: "Tipo de prueba actualizado con éxito!",
        delete: "Tipo de prueba eliminado con éxito!"
    },
    error: {
        create: "Error al crear el tipo de prueba!",
        update: "Error al actualizar el tipo de prueba!",
        delete: "Error al eliminar el tipo de prueba!"
    }
};

/*
* Material Messages
*/
export const MaterialMsgs = {
    success: {
        select: "Materiales seleccionados con éxito!",
        create: "Material creado con éxito!",
        update: "Material actualizado con éxito!",
        delete: "Material eliminado con éxito!"
    },
    error: {
        select: "Error al seleccionar los materiales!",
        create: "Error al crear el material!",
        update: "Error al actualizar el material!",
        delete: "Error al eliminar el material!"
    }
};

export const SpecificationMsgs = {
    success: {
        create: "Especificación creada con éxito!",
        update: "Especificación actualizada con éxito!",
        delete: "Especificación eliminada con éxito!"
    },
    error: {
        create: "Error al crear la especificación!",
        update: "Error al actualizar la especificación!",
        delete: "Error al eliminar la especificación!"
    }
};

export const ConfigurationMsgs = {
    success: {
        create: "Configuración creada con éxito!",
        update: "Configuración actualizada con éxito!",
        delete: "Configuración eliminada con éxito!"
    },
    error: {
        create: "Error al crear la configuración!",
        update: "Error al actualizar la configuración!",
        delete: "Error al eliminar la configuración!"
    }
};

/**
 * Operator Messages
 */
export const OperatorMsgs = {
    success: {
        select: "Operadores seleccionados con éxito!",
        create: "Operador creado con éxito!",
        update: "Operador actualizado con éxito!",
        delete: "Operador eliminado con éxito!"
    },
    error: {
        select: "Error al seleccionar los operadores!",
        create: "Error al crear el operador!",
        update: "Error al actualizar el operador!",
        delete: "Error al eliminar el operador!"
    }
};