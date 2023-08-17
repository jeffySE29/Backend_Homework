export function Response(code, message, data) {
    return { code, message, data }
}

export function MessageResponse(message) {
    return Response(200, message)
}

export function DataResponse(data) {
    return Response(200, 'OK', data)
}

export function NotFoundResponse() {
    return ErrorResponse(404, 'Not Found')
}
export function InternalErrResponse(){
    return Response(500, 'Internal server error')
}
export function MissingFieldResponse() {
    return ErrorResponse(400, 'Missing field')
}

export function ErrorResponse(errorCode, errorMessage) {
    return Response(errorCode, errorMessage)
}

export function UnauthorizedResponse(){
    return ErrorResponse(401, 'Unauthorized')
}